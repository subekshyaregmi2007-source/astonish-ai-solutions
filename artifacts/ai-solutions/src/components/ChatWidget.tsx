import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  id: 0,
  role: "assistant",
  text: "Hi! I'm the AI-Solutions virtual assistant. I can help you learn about our software solutions, industries we serve, upcoming events, or how to get in touch. What would you like to know?",
};

type Rule = {
  patterns: RegExp[];
  response: string;
};

const RULES: Rule[] = [
  {
    patterns: [/hello|hi\b|hey|good (morning|afternoon|evening)/i],
    response:
      "Hello! Welcome to AI-Solutions. We're a Sunderland-based AI company helping industries transform their digital employee experience. How can I help you today?",
  },
  {
    patterns: [/what (is|are) ai.?solutions|who are you|about (the )?company|tell me about/i],
    response:
      "AI-Solutions is a forward-thinking AI company based in Sunderland, UK. We leverage artificial intelligence to help global industries rapidly address issues impacting the digital employee experience. Our flagship product is an AI-powered virtual assistant, and we also provide predictive analytics, workflow automation, and knowledge management tools.",
  },
  {
    patterns: [/solution|product|software|what do you (offer|do|sell|provide)/i],
    response:
      "We offer six core solutions:\n\n— AI-Powered Virtual Assistant: 24/7 intelligent support with seamless human handoff\n— Predictive Issue Resolution: detect and fix problems before employees notice\n— Intelligent Workflow Automation: automate repetitive processes with AI decision nodes\n— Digital Experience Analytics: real-time insights into employee experience health\n— AI Prototyping Studio: go from concept to working prototype in days\n— Secure Knowledge Management: AI-powered search across your organisation's knowledge\n\nVisit our Solutions page to learn more!",
  },
  {
    patterns: [/virtual assistant|chatbot|assistant/i],
    response:
      "Our AI-Powered Virtual Assistant is our flagship product. It understands context, resolves employee queries 24/7 across any platform, and knows exactly when to escalate to a human agent for a seamless experience. It includes natural language understanding, sentiment analysis, and a fully customisable knowledge base.",
  },
  {
    patterns: [/predict|proactive|prevent|downtime/i],
    response:
      "Our Predictive Issue Resolution platform uses AI to detect anomalies and resolve digital employee experience issues before they impact productivity — reducing unplanned downtime by up to 80%. It includes root cause analysis, automated remediation, and SLA management.",
  },
  {
    patterns: [/automat|workflow|process/i],
    response:
      "Our Intelligent Workflow Automation turns manual, repetitive processes into smart automated workflows that continuously improve. With a visual workflow builder, AI decision nodes, and a wide integration hub, you can connect virtually any system.",
  },
  {
    patterns: [/analytic|dashboard|insight|metric|report/i],
    response:
      "Our Digital Experience Analytics platform provides real-time visibility into employee experience health, productivity patterns, and satisfaction metrics. Clients get live dashboards, custom reporting, and API access — all updated in real time.",
  },
  {
    patterns: [/prototype|studio|rapid/i],
    response:
      "The AI Prototyping Studio lets enterprises validate AI-powered solutions in days, not months. Drag-and-drop builder, access to our AI model library, rapid testing, and easy stakeholder sharing — then export directly to production when you're ready.",
  },
  {
    patterns: [/knowledge|document|search|information/i],
    response:
      "Our Secure Knowledge Management system centralises organisational knowledge with AI-powered search, automatic tagging, and intelligent recommendations. It integrates natively with Microsoft 365 and includes full access controls, version history, and analytics.",
  },
  {
    patterns: [/industr|sector|client|who (do you work|have you worked)/i],
    response:
      "We've transformed digital employee experience across five major sectors:\n\n— Healthcare: NHS Digital transformation across 12 trusts\n— Financial Services: 8,000 endpoints globally for Global Bank Corp\n— Manufacturing: AeroTech Industries workflow automation\n— Retail: RetailMax across 500+ store locations\n— Education: EduLearn Consortium covering 15 UK universities\n\nVisit our Industries page for full case studies.",
  },
  {
    patterns: [/nhs|health|hospital/i],
    response:
      "Our NHS Digital transformation project deployed an AI-powered virtual assistant across 12 NHS trusts, handling over 40,000 monthly employee IT queries — reducing resolution time from 48 hours to under 4 minutes and saving £2.3M annually.",
  },
  {
    patterns: [/bank|financ|insurance/i],
    response:
      "In financial services, we deployed predictive issue resolution for Global Bank Corp across 8,000 employee endpoints in 40 countries — achieving a 94% reduction in unplanned downtime and a 99.8% employee satisfaction score.",
  },
  {
    patterns: [/retail|shop|store/i],
    response:
      "We worked with RetailMax to deploy AI knowledge management across 500+ retail locations. Staff can now instantly access product, policy, and troubleshooting information — cutting customer resolution time by 62%.",
  },
  {
    patterns: [/university|education|school|student/i],
    response:
      "For the EduLearn Consortium, we built an AI-powered digital experience platform serving 50,000 students and staff across 15 UK universities — with a 91% first-contact resolution rate.",
  },
  {
    patterns: [/testimonial|review|feedback|what (do|did) (clients|customers) (say|think)/i],
    response:
      "Our clients consistently rate us 5 stars. Dr. Sarah Mitchell (NHS Digital CDO): \"This is what the future of public sector digital transformation looks like.\" James Okonkwo (VP Technology, Global Bank Corp): \"The ROI speaks for itself.\" Visit our Testimonials page to read all client stories.",
  },
  {
    patterns: [/event|conference|summit|workshop|meetup/i],
    response:
      "Upcoming events:\n\n— AI-Solutions Annual Innovation Summit 2024: September 15, Sunderland Civic Centre. 500+ technology leaders, keynotes, workshops, and live demos.\n— Enterprise AI Bootcamp — London: October 3, The Shard. Intensive two-day bootcamp for enterprise technology teams.\n\nVisit our Events page for the full list.",
  },
  {
    patterns: [/article|news|blog|insight|read|publication/i],
    response:
      "Recent articles:\n\n— \"How AI is Reshaping the Digital Employee Experience in 2024\"\n— \"The ROI of AI: What Our Clients Are Actually Achieving\"\n— \"Building the Future: AI-Solutions Opens Sunderland Innovation Lab\"\n\nVisit our Articles page to read the full library.",
  },
  {
    patterns: [/roi|return|saving|cost|value|investment/i],
    response:
      "Across 20 enterprise deployments, our clients achieve:\n\n— Average payback period: 7.2 months\n— IT support cost reduction: 64% average\n— Employee satisfaction improvement: +38 percentage points\n— Unplanned downtime reduction: 71% average",
  },
  {
    patterns: [/contact|get in touch|reach|speak|talk|email|phone|enquir|inquir/i],
    response:
      "You can reach us through our Contact page. Fill in your name, email, phone, company, country, job title, and project details — our team will get back to you promptly. We're based in Sunderland, UK and work with clients worldwide.",
  },
  {
    patterns: [/demo|demonstration|trial|try|pilot/i],
    response:
      "We'd love to show you AI-Solutions in action! Head to our Contact page and mention you'd like a personalised demo. Our team will arrange a tailored demonstration based on your industry and use case.",
  },
  {
    patterns: [/price|pricing|cost|how much|fee|subscription|licens/i],
    response:
      "Our pricing is tailored to each organisation's scale, industry, and requirements. Contact us through our Contact page with your project details — our team will put together a proposal that fits your needs and budget.",
  },
  {
    patterns: [/where|location|office|based|sunderland/i],
    response:
      "AI-Solutions is headquartered in Sunderland, UK — part of the growing North East technology hub. We recently opened our Innovation Lab, a 12,000 sq ft research facility housing 40 researchers and data scientists. We serve clients globally across Europe, North America, Asia, and Africa.",
  },
  {
    patterns: [/award|recognition|gartner|deloitte|accolade/i],
    response:
      "We've received significant industry recognition:\n\n— UK Tech Innovation Award 2024 — Enterprise AI Solutions\n— Gartner Cool Vendor in Digital Employee Experience\n— Deloitte Fast 50 — one of the UK's fastest-growing technology companies",
  },
  {
    patterns: [/safe|secure|privacy|gdpr|data|complian/i],
    response:
      "Security and compliance are core to everything we build. Our Knowledge Management system includes full access controls, and our AI development follows rigorous ethical assessment through our Innovation Lab's dedicated ethics review board. We work with regulated industries including NHS and financial services.",
  },
  {
    patterns: [/thank|thanks|great|helpful|perfect|awesome/i],
    response:
      "You're very welcome! If you have any other questions or would like to explore how AI-Solutions can help your organisation, don't hesitate to ask — or visit our Contact page to speak with our team directly.",
  },
  {
    patterns: [/bye|goodbye|see you|later/i],
    response:
      "Thank you for chatting with us! If you'd like to continue the conversation or arrange a demo, visit our Contact page. Have a great day!",
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(lower))) {
      return rule.response;
    }
  }
  return "I'm not sure I have the answer to that specific question, but our team would love to help! Visit our Contact page and our experts will get back to you. You can also explore our Solutions, Industries, or Articles pages for more information.";
}

function formatText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getResponse(text);
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: response }]);
    }, 700 + Math.random() * 500);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-[#6ee7b7] text-white shadow-lg hover:bg-[#34d399] transition-colors"
        style={{ boxShadow: "0 8px 32px rgba(110,231,183,0.35)" }}
        aria-label="Open chat"
        data-testid="button-chat-toggle"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[540px] flex flex-col overflow-hidden border border-[#262626]"
            style={{
              background: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(110,231,183,0.08)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            data-testid="panel-chat"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#262626] flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 bg-[#6ee7b7] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5e2e1]">AI-Solutions Assistant</div>
                <div className="text-[10px] text-[#a8c4b0] flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 inline-block" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#262626 transparent" }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 shrink-0 flex items-center justify-center ${msg.role === "assistant" ? "bg-[#6ee7b7]/20 text-[#6ee7b7]" : "bg-[#262626] text-[#e5e2e1]"}`}>
                    {msg.role === "assistant" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  </div>
                  <div
                    className={`max-w-[82%] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-[#131313] border border-[#262626] text-[#e5e2e1]"
                        : "bg-[#6ee7b7] text-white"
                    }`}
                    data-testid={`message-${msg.role}-${msg.id}`}
                  >
                    {formatText(msg.text)}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 bg-[#6ee7b7]/20 text-[#6ee7b7] flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-[#131313] border border-[#262626] px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-[#6ee7b7] inline-block"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#262626] flex items-center gap-2 shrink-0 bg-[#0d0d0d]">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask a question..."
                className="flex-1 text-[13px] px-3 py-2 bg-[#131313] border border-[#262626] text-[#e5e2e1] placeholder-[#6b7280] focus:outline-none focus:border-[#6ee7b7] transition-colors"
                data-testid="input-chat"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="w-9 h-9 bg-[#6ee7b7] text-white flex items-center justify-center hover:bg-[#34d399] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                data-testid="button-chat-send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
