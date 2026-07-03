import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { solutionsTable } from "../../database/src/schema/solutions.ts";
import { industriesTable } from "../../database/src/schema/industries.ts";
import { testimonialsTable } from "../../database/src/schema/testimonials.ts";
import { articlesTable } from "../../database/src/schema/articles.ts";
import { eventsTable } from "../../database/src/schema/events.ts";
import { inquiriesTable } from "../../database/src/schema/inquiries.ts";

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function seed() {
  console.log("Seeding database...");

  await db.delete(inquiriesTable);
  await db.delete(eventsTable);
  await db.delete(articlesTable);
  await db.delete(testimonialsTable);
  await db.delete(industriesTable);
  await db.delete(solutionsTable);

  await db.insert(solutionsTable).values([
    {
      title: "Virtual Assistant Platform",
      description:
        "Deploy intelligent AI-powered virtual assistants that handle employee queries, automate routine tasks, and provide 24/7 support across your organisation.",
      category: "Automation",
      icon: "bot",
      features: [
        "Natural language understanding",
        "Multi-channel deployment",
        "Seamless HR system integration",
        "Real-time analytics dashboard",
        "Custom knowledge base builder",
        "Multilingual support",
      ],
      imageUrl: "/images/solution-virtual-assistant.png",
    },
    {
      title: "Digital Employee Experience",
      description:
        "Transform how your workforce interacts with enterprise tools by unifying fragmented systems into a single, intelligent digital workplace hub.",
      category: "Workplace",
      icon: "layout-dashboard",
      features: [
        "Unified employee portal",
        "Personalised onboarding flows",
        "Smart search across all systems",
        "Proactive notifications",
        "Self-service request management",
        "Sentiment analysis",
      ],
      imageUrl: "/images/solution-digital-experience.png",
    },
    {
      title: "Predictive IT Operations",
      description:
        "Anticipate and resolve IT issues before they impact productivity using machine learning models trained on your infrastructure data.",
      category: "IT Operations",
      icon: "activity",
      features: [
        "Anomaly detection",
        "Automated incident routing",
        "Predictive capacity planning",
        "Root cause analysis",
        "SLA monitoring",
        "Integration with ServiceNow & Jira",
      ],
      imageUrl: "/images/solution-predictive-it.png",
    },
    {
      title: "Knowledge Management AI",
      description:
        "Surface the right information at the right time. Our AI curates, indexes and delivers institutional knowledge directly within employee workflows.",
      category: "Knowledge",
      icon: "book-open",
      features: [
        "Automatic content tagging",
        "Expertise location",
        "Gap analysis reporting",
        "Version-controlled knowledge base",
        "Search intent understanding",
        "SharePoint & Confluence connectors",
      ],
      imageUrl: "/images/solution-knowledge.png",
    },
    {
      title: "Workforce Analytics Suite",
      description:
        "Gain deep visibility into workforce trends, engagement levels, and productivity metrics to make data-driven HR and operational decisions.",
      category: "Analytics",
      icon: "bar-chart-2",
      features: [
        "Real-time engagement tracking",
        "Attrition risk scoring",
        "Custom KPI dashboards",
        "Automated executive reports",
        "Benchmarking against industry peers",
        "GDPR-compliant data handling",
      ],
      imageUrl: "/images/solution-analytics.png",
    },
    {
      title: "Conversational Service Desk",
      description:
        "Replace traditional ticketing with an AI-driven conversational service desk that resolves issues instantly and escalates intelligently.",
      category: "Service Desk",
      icon: "headphones",
      features: [
        "Intent-based ticket deflection",
        "Automated resolution workflows",
        "Agent assist mode",
        "CSAT measurement",
        "Omnichannel support (chat, email, voice)",
        "AI-powered triage",
      ],
      imageUrl: "/images/solution-service-desk.png",
    },
  ]);

  await db.insert(industriesTable).values([
    {
      name: "National Health Service Trust",
      sector: "Healthcare",
      description:
        "A large NHS Trust in the North East of England deployed our Virtual Assistant Platform to handle over 12,000 monthly staff queries, freeing clinical staff to focus on patient care.",
      outcome:
        "Reduced HR query resolution time by 74% and saved an estimated 4,200 staff hours per month.",
      year: 2023,
      imageUrl: "/images/industry-healthcare.png",
    },
    {
      name: "Global Financial Services Group",
      sector: "Financial Services",
      description:
        "A FTSE 100 financial services group integrated our Digital Employee Experience platform across 28 countries, consolidating 14 legacy intranets into one intelligent portal.",
      outcome:
        "Employee satisfaction scores increased by 31% within six months of launch.",
      year: 2022,
      imageUrl: "/images/industry-finance.png",
    },
    {
      name: "UK Central Government Department",
      sector: "Public Sector",
      description:
        "A UK central government department adopted our Predictive IT Operations solution to manage a hybrid infrastructure serving 45,000 civil servants.",
      outcome:
        "IT incidents down 58%; mean time to resolution improved from 4.2 hours to under 40 minutes.",
      year: 2023,
      imageUrl: "/images/industry-public-sector.png",
    },
    {
      name: "European Retail Conglomerate",
      sector: "Retail",
      description:
        "A pan-European retailer with 80,000 frontline staff deployed our Conversational Service Desk to replace email-based IT support across 12 countries.",
      outcome:
        "First-contact resolution rate rose from 34% to 81%, cutting helpdesk costs by £2.1m annually.",
      year: 2024,
      imageUrl: "/images/industry-retail.png",
    },
    {
      name: "International Logistics Operator",
      sector: "Logistics",
      description:
        "A global logistics company used our Workforce Analytics Suite to monitor engagement across distributed teams spanning six continents.",
      outcome:
        "Attrition reduced by 22% in the first year, saving £3.8m in recruitment and training costs.",
      year: 2024,
      imageUrl: "/images/solution-predictive-it.png",
    },
  ]);

  await db.insert(testimonialsTable).values([
    {
      clientName: "Sarah Mitchell",
      company: "NorthEast NHS Trust",
      role: "Chief Digital Officer",
      rating: 5,
      message:
        "AI-Solutions transformed how our staff access HR support. The virtual assistant handles thousands of queries a week without any human intervention — it's been a game changer for our overworked HR teams.",
      avatarUrl: null,
    },
    {
      clientName: "James Thornton",
      company: "Meridian Financial Group",
      role: "VP of Workplace Technology",
      rating: 5,
      message:
        "Rolling out the Digital Employee Experience platform globally was seamless. The team at AI-Solutions understood our complexity and delivered on time. Our employees genuinely love using it.",
      avatarUrl: null,
    },
    {
      clientName: "Priya Nair",
      company: "Department for Business & Trade",
      role: "Head of IT Strategy",
      rating: 5,
      message:
        "The predictive IT operations capability has fundamentally changed how we manage infrastructure. We're fixing problems before users even notice them — that's the standard we always aspired to.",
      avatarUrl: null,
    },
    {
      clientName: "Marco Delgado",
      company: "EuroRetail Holdings",
      role: "Group IT Director",
      rating: 4,
      message:
        "Implementation was fast and the ROI was clear within three months. Our service desk agents now handle only the complex cases — everything routine is handled automatically. Highly recommended.",
      avatarUrl: null,
    },
    {
      clientName: "Fiona Callahan",
      company: "TransGlobe Logistics",
      role: "Chief People Officer",
      rating: 5,
      message:
        "The workforce analytics gave us insights we simply couldn't get before. We can now act on engagement signals early, which has meaningfully reduced attrition. The AI-Solutions team are true partners.",
      avatarUrl: null,
    },
    {
      clientName: "David Okafor",
      company: "Beacon Insurance Group",
      role: "Director of Digital Transformation",
      rating: 4,
      message:
        "We evaluated four vendors and AI-Solutions stood out for their depth of understanding of the insurance sector. The knowledge management AI has made our compliance teams far more efficient.",
      avatarUrl: null,
    },
  ]);

  await db.insert(articlesTable).values([
    {
      title: "Why Proactive AI is the Future of the Digital Workplace",
      summary:
        "Reactive IT support is no longer enough. We explore how proactive AI systems are reshaping employee experience and why forward-thinking organisations are making the switch.",
      content:
        "For decades, enterprise IT operated on a simple principle: wait for something to break, then fix it. But as organisations grow more complex and employee expectations rise, that model is failing. In this article, we examine how AI-powered proactive monitoring and predictive service management are changing the game.\n\nThe cost of downtime has never been higher. A major incident affecting 10,000 employees for just one hour can cost hundreds of thousands of pounds in lost productivity. Yet most organisations still rely on reactive helpdesks that only spring into action once users raise tickets.\n\nProactive AI changes the equation by continuously monitoring signals across the infrastructure — from application performance to sentiment in support conversations — to identify issues before they escalate. At AI-Solutions, our Predictive IT Operations platform has helped clients reduce incidents by more than 50% within the first six months of deployment.\n\nBeyond cost savings, proactive AI delivers something even more valuable: trust. When employees know their tools will work reliably, they engage more deeply with digital systems and adopt new technologies faster. That virtuous cycle drives the digital transformation outcomes that CIOs are measured on.",
      author: "Dr. Amara Osei",
      publishedAt: new Date("2024-10-14"),
      category: "Thought Leadership",
      imageUrl: "/images/solution-virtual-assistant.png",
    },
    {
      title: "AI-Solutions Recognised in Gartner's 2024 Digital Workplace Report",
      summary:
        "We are proud to announce that AI-Solutions has been named a notable vendor in Gartner's annual Digital Workplace Technologies report.",
      content:
        "AI-Solutions has been recognised by Gartner as a notable vendor in the 2024 Digital Workplace Technologies report, a milestone that reflects the progress we have made since our founding in Sunderland in 2019.\n\nGartner's report evaluates vendors across several dimensions including product capability, customer satisfaction, and market presence. Our inclusion reflects the growing adoption of our platform across healthcare, financial services, and the public sector.\n\n\"Being recognised by Gartner validates what our clients have told us for years,\" said CEO Callum Reid. \"Our technology genuinely changes how organisations support their people, and this recognition will help more buyers discover what we have built.\"\n\nWe believe this is just the beginning. With our upcoming launch of Workforce Analytics Suite v3 and expanded integrations with Microsoft 365 Copilot, we are continuing to invest heavily in the platform.",
      author: "Callum Reid",
      publishedAt: new Date("2024-09-03"),
      category: "Company News",
      imageUrl: "/images/solution-analytics.png",
    },
    {
      title: "Five Signs Your Service Desk is Holding Back Your Business",
      summary:
        "If your helpdesk is still running on email and spreadsheets, you may be paying a higher price than you realise. Here are five warning signs — and what to do about them.",
      content:
        "Service desks are often treated as cost centres — necessary overheads rather than strategic assets. But the best-run organisations understand that fast, intelligent employee support is a competitive advantage. Here are five signs your current approach is falling short.\n\n1. Your first-contact resolution rate is below 60%. Industry benchmarks put best-in-class service desks at 80% or above. If your agents are constantly escalating, your knowledge base and automation are likely insufficient.\n\n2. Employees are bypassing the desk entirely. When workers email colleagues directly or post in Slack rather than raising a ticket, it signals a lack of trust in the system.\n\n3. You have no visibility into recurring issues. Without analytics, you can't spot patterns that, if fixed once, would eliminate dozens of repeat tickets.\n\n4. Onboarding takes more than two days. Modern conversational service desks can automate the majority of onboarding tasks — provisioning accounts, delivering equipment, answering FAQs — reducing new joiner friction dramatically.\n\n5. Your CSAT scores are flat or declining. If employees aren't satisfied with support, engagement and productivity will follow the same trajectory.\n\nThe good news: modern AI-driven service desks can address all five of these issues simultaneously.",
      author: "Niamh Gallagher",
      publishedAt: new Date("2024-07-22"),
      category: "Insights",
      imageUrl: "/images/solution-service-desk.png",
    },
    {
      title: "AI-Solutions Opens New Engineering Hub in Newcastle",
      summary:
        "We are expanding our R&D footprint with a second UK engineering hub in Newcastle upon Tyne, creating 45 new technology roles over the next 18 months.",
      content:
        "AI-Solutions is thrilled to announce the opening of a new engineering hub in Newcastle upon Tyne, our second UK location after our headquarters in Sunderland. The new office, located in the Stephenson Quarter, will focus on applied AI research and platform engineering.\n\nThe expansion reflects strong customer demand and forms part of our broader strategy to invest in the talent pipeline across the North East of England — one of the UK's most exciting emerging tech corridors.\n\nWe will hire 45 engineers, data scientists, and product designers over the next 18 months, with roles at all levels from graduate to principal. Job listings are now live on our careers page.\n\n\"The North East has extraordinary technical talent,\" said Chief Technology Officer Dr. Amara Osei. \"We are proud to be deepening our roots here while building world-class AI products that are used across Europe.\"",
      author: "Communications Team",
      publishedAt: new Date("2024-05-16"),
      category: "Company News",
      imageUrl: "/images/industry-public-sector.png",
    },
    {
      title: "Understanding the ROI of Employee Experience Technology",
      summary:
        "Calculating the return on investment for digital workplace platforms can be complex. This guide walks through the key metrics that matter and how to build a compelling business case.",
      content:
        "When organisations consider investing in employee experience technology, finance teams often ask the same question: how do we measure the return? Unlike a CRM or ERP where transactional outcomes are easier to quantify, workplace technology ROI is multidimensional.\n\nThe most straightforward metric is deflection rate — the proportion of service desk queries resolved without human agent involvement. Each deflected ticket has a measurable cost saving. If your average ticket costs £18 to resolve with an agent and you deflect 60% of 5,000 monthly tickets, that's £54,000 saved per month.\n\nBut the harder-to-measure benefits are often larger. Reduced attrition, faster onboarding, and improved engagement translate directly into business performance. Our clients consistently report that every 5% improvement in engagement correlates with a 3% increase in productivity scores.\n\nWe recommend building your business case around three horizons: immediate efficiency gains (0–6 months), adoption-driven engagement improvement (6–18 months), and strategic capability growth (18 months+). A phased model makes it easier to get buy-in and demonstrate early wins.",
      author: "Dr. Amara Osei",
      publishedAt: new Date("2024-03-08"),
      category: "Insights",
      imageUrl: "/images/solution-knowledge.png",
    },
  ]);

  await db.insert(eventsTable).values([
    {
      title: "Digital Workplace Summit 2025",
      description:
        "AI-Solutions hosts its flagship annual event bringing together CIOs, CHROs and digital workplace leaders from across Europe to explore the future of AI-powered work. Featuring keynotes, workshops, and live product demonstrations.",
      date: "2025-09-18",
      location: "The Sage Gateshead, UK",
      type: "Conference",
      isUpcoming: true,
      photos: [],
      coverImageUrl: "/images/solution-digital-experience.png",
    },
    {
      title: "Public Sector AI Roundtable — London",
      description:
        "An invitation-only roundtable for senior technology and HR leaders from central and local government, exploring practical applications of AI in public sector employee experience.",
      date: "2025-07-10",
      location: "The Barbican, London, UK",
      type: "Roundtable",
      isUpcoming: true,
      photos: [],
      coverImageUrl: "/images/industry-public-sector.png",
    },
    {
      title: "HR Technology Expo 2024",
      description:
        "AI-Solutions exhibited at Europe's largest HR technology trade show, showcasing the latest enhancements to our Virtual Assistant Platform and Workforce Analytics Suite to over 12,000 attendees.",
      date: "2024-11-06",
      location: "RAI Amsterdam, Netherlands",
      type: "Exhibition",
      isUpcoming: false,
      photos: [],
      coverImageUrl: "/images/solution-analytics.png",
    },
    {
      title: "Northeast Tech Festival 2024",
      description:
        "Our engineering and product teams participated in the Northeast Tech Festival, running sessions on responsible AI development and the practical realities of deploying large language models in enterprise environments.",
      date: "2024-06-20",
      location: "Sunderland Software Centre, UK",
      type: "Festival",
      isUpcoming: false,
      photos: [],
      coverImageUrl: "/images/solution-knowledge.png",
    },
    {
      title: "Customer Success Day — Manchester",
      description:
        "An exclusive half-day event for AI-Solutions customers in the North West, featuring product roadmap updates, customer case study presentations, and networking with our leadership team.",
      date: "2024-03-14",
      location: "Manchester Central, UK",
      type: "Customer Event",
      isUpcoming: false,
      photos: [],
      coverImageUrl: "/images/industry-finance.png",
    },
  ]);

  await db.insert(inquiriesTable).values([
    {
      name: "Helen Foster",
      email: "h.foster@meridianhealth.nhs.uk",
      phone: "+44 191 555 0182",
      companyName: "Meridian Health NHS Trust",
      country: "United Kingdom",
      jobTitle: "Director of Digital",
      jobDetails:
        "We are looking to replace our existing helpdesk solution with an AI-driven platform. We have approximately 6,000 staff across three hospital sites.",
    },
    {
      name: "Thomas Berg",
      email: "t.berg@novalife.de",
      phone: "+49 30 555 0291",
      companyName: "NovaLife Insurance AG",
      country: "Germany",
      jobTitle: "Head of HR Technology",
      jobDetails:
        "Interested in your Digital Employee Experience platform for a pan-European rollout across 18 countries. Would like to arrange a product demonstration.",
    },
    {
      name: "Aisha Kamara",
      email: "aisha.kamara@dbt.gov.uk",
      phone: "+44 20 7555 0134",
      companyName: "Department for Business & Trade",
      country: "United Kingdom",
      jobTitle: "Deputy Director, Digital Workplace",
      jobDetails:
        "Following your session at the Public Sector AI Roundtable, we would like to explore a pilot of the Predictive IT Operations solution.",
    },
  ]);

  console.log("Seed complete.");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
