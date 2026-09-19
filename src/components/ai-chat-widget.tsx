import { useState, type FormEvent } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const content = input.trim(); if (!content || busy) return;
    const next = [...messages, { role: "user" as const, content }]; setMessages(next); setInput(""); setBusy(true);
    try { const response = await fetch("/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) }); const data = await response.json().catch(() => ({})); setMessages([...next, { role: "assistant", content: response.ok && typeof data.message === "string" ? data.message : "Please contact our team on WhatsApp and we will help with your vehicle request." }]); } catch { setMessages([...next, { role: "assistant", content: "The chat service is temporarily unavailable. Please contact our team on WhatsApp." }]); } finally { setBusy(false); }
  }
  return <>{open && <section className="fixed bottom-[calc(10.5rem+env(safe-area-inset-bottom))] right-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col border border-border bg-background shadow-2xl sm:bottom-24 sm:right-5" aria-label="AWA AUTO MALL AI chat"><div className="flex items-center justify-between border-b border-border bg-navy p-4 text-primary-foreground"><div className="flex items-center gap-2"><Bot className="h-5 w-5" /><strong className="text-sm uppercase">AWA Assistant</strong></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X className="h-5 w-5" /></button></div><div className="flex max-h-72 min-h-28 flex-col gap-3 overflow-y-auto p-4 text-sm">{messages.length === 0 && <p className="text-muted-foreground">Ask about finding and sourcing a vehicle.</p>}{messages.map((message, index) => <p key={`${message.role}-${index}`} className={message.role === "user" ? "self-end bg-primary px-3 py-2 text-primary-foreground" : "bg-secondary px-3 py-2 text-foreground"}>{message.content}</p>)}{busy && <p className="text-muted-foreground">Thinking...</p>}</div><form onSubmit={submit} className="flex gap-2 border-t border-border p-3"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question" aria-label="Chat message" className="min-w-0 flex-1 border border-input bg-background px-3 text-sm" /><Button type="submit" size="icon" aria-label="Send message" disabled={busy}><Send className="h-4 w-4" /></Button></form></section>}
    <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close AI chat" : "Open AI chat"} className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-20 z-40 grid h-12 w-12 place-items-center rounded-full bg-navy text-primary-foreground shadow-lg transition-transform hover:scale-105 sm:bottom-5 sm:right-24 sm:h-14 sm:w-14"><Bot className="h-6 w-6" /></button></>;
}
