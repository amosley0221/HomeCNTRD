// ai.js — Conversation agent client (calls HA's conversation.process REST
// endpoint). Configured by the user in HA → Settings → Voice Assistants;
// the actual LLM (Anthropic Claude, OpenAI, Google Gemini, local Ollama)
// is HA's choice, not ours. We just send text and surface the reply.
//
// HA's `conversation/process` without an explicit `agent_id` routes to
// its built-in *default* conversation agent (typically local Assist),
// NOT the user's starred / preferred assistant. To match what the
// HA frontend's chat does, we resolve the preferred Assist pipeline
// once per session and pass its conversation engine as agent_id.
//
// For Phase 4 MVP this is a fallback for free-text questions / chat.
// Recognised "open X on Y" voice commands are handled client-side by
// intents.js so they're instant.

let _preferredAgentIdPromise = null;

async function resolvePreferredAgentId(hass) {
  if (!hass?.callWS) return null;
  if (_preferredAgentIdPromise) return _preferredAgentIdPromise;
  _preferredAgentIdPromise = (async () => {
    try {
      const res = await hass.callWS({ type: 'assist_pipeline/pipeline/list' });
      const pipelines = res?.pipelines || [];
      const preferredId = res?.preferred_pipeline;
      const preferred = pipelines.find(p => p.id === preferredId) || pipelines[0];
      // The pipeline's conversation agent field name has bounced
      // between `conversation_engine` and `conversation_agent` across
      // HA versions; accept both.
      return preferred?.conversation_engine || preferred?.conversation_agent || null;
    } catch {
      return null;
    }
  })();
  return _preferredAgentIdPromise;
}

export async function askAgent(hass, text, { agentId } = {}) {
  if (!hass || !text) return null;
  try {
    const body = { text };
    const finalAgentId = agentId || await resolvePreferredAgentId(hass);
    if (finalAgentId) body.agent_id = finalAgentId;
    const r = await hass.callApi('POST', 'conversation/process', body);
    const speech = r?.response?.speech?.plain?.speech
      || r?.response?.card?.simple?.text
      || '';
    return { speech, raw: r };
  } catch (e) {
    return { speech: `Couldn't reach the conversation agent. ${e.message || ''}`.trim(), error: e };
  }
}
