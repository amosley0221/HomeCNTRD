// ai.js — Conversation agent client (calls HA's conversation.process REST
// endpoint). Configured by the user in HA → Settings → Voice Assistants;
// the actual LLM (Anthropic Claude, OpenAI, Google Gemini, local Ollama)
// is HA's choice, not ours. We just send text and surface the reply.
//
// For Phase 4 MVP this is a fallback for free-text questions / chat.
// Recognised "open X on Y" voice commands are handled client-side by
// intents.js so they're instant.

export async function askAgent(hass, text, { agentId } = {}) {
  if (!hass || !text) return null;
  try {
    const body = { text };
    if (agentId) body.agent_id = agentId;
    const r = await hass.callApi('POST', 'conversation/process', body);
    const speech = r?.response?.speech?.plain?.speech
      || r?.response?.card?.simple?.text
      || '';
    return { speech, raw: r };
  } catch (e) {
    return { speech: `Couldn't reach the conversation agent. ${e.message || ''}`.trim(), error: e };
  }
}
