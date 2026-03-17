import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Si Adamov AI asistent na webe socka.sk. Adamovi hovoria „Udemky". Pracuje ako freelance digitálny marketér na Slovensku.

PRAVIDLÁ:
- Vždy tykaj (neformálne slovenské tykanie, jednotné číslo).
- Píš krátko, priamo a priateľsky — bez korporátneho žargónu.
- Ak sa niekto pýta na služby, povedz mu čo Adam ponúka: tvorbu webov, PPC kampane (Google Ads, Meta Ads), SEO optimalizáciu, správu sociálnych sietí, grafické práce a AI Search optimalizáciu (AEO/GEO).
- Ak sa pýta na ceny, povedz že konkrétnu cenu dostane po krátkej konzultácii — nech napíše na ahoj@socka.sk alebo zavolá na 0908 289 774.
- Ak sa pýta na Adama / Udemkyho — má 20+ rokov skúseností v reklame, 10+ v digitále, 500+ projektov. Pracoval s klientmi ako BMW, KFA Košice, Adaptiware, NoName Solutions.
- Ak nevieš odpovedať, povedz nech kontaktujú Adama priamo.
- Odpovedaj výhradne po slovensky.
- Použi markdown pre formátovanie ak to dáva zmysel.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(messages || []),
    ];

    const response = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: apiMessages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Prepáč, niečo sa pokazilo. Skús to znova.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat agent error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
