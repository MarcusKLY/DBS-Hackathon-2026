import { useState, useCallback, useRef, useEffect } from 'react'
import {
  LayoutGrid, Calendar, Users, Filter, CheckSquare, Lightbulb,
  Folder, CalendarDays, Bell, Search, User, AlertCircle, Clock,
  TrendingUp, ArrowRight, Mail, Video, FileText, ShieldCheck,
  Sparkles, DollarSign, Zap, ArrowLeft, Download, RefreshCw,
  X, Phone, CheckCircle2, ChevronRight, type LucideIcon,
  Cake, Wallet, PieChart, Plane, FileCheck, Activity,
  Target, ClipboardList, History, BarChart3, Timer,
  ChevronLeft,
  Wand2, Send, MessageSquare, Bot, Minus, Trash2,
  TrendingDown, Share2, Play, StickyNote, CalendarCheck,
} from 'lucide-react'
import './App.css'

/* ============================================================
   Navigation Items with lucide icons
   ============================================================ */

const navItems: { label: string; icon: LucideIcon }[] = [
  { label: 'RM Command Centre', icon: LayoutGrid },
  { label: 'Daily Brief', icon: Calendar },
  { label: 'Customers', icon: Users },
  { label: 'Pipeline', icon: Filter },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Insights', icon: Lightbulb },
  { label: 'Resources', icon: Folder },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Notifications', icon: Bell },
]

/* ============================================================
   KPI Cards with icons
   ============================================================ */

const kpiCards: { label: string; value: string; sub: string; color: string; icon: LucideIcon }[] = [
  { label: 'Customers to Reach', value: '12', sub: '8 high priority', color: 'red', icon: Users },
  { label: 'High-Priority', value: '8', sub: 'Needs attention this week', color: 'red', icon: AlertCircle },
  { label: 'Avg. Days Since Contact', value: '42', sub: 'Above 30-day target', color: 'yellow', icon: Clock },
  { label: 'Engagement Needs', value: '76%', sub: 'Based on AI signals', color: 'green', icon: TrendingUp },
]

/* ============================================================
   Dashboard — Daily Summary Stat Cards
   ============================================================ */

const dashboardStats: { label: string; value: string; sub: string; icon: LucideIcon; color: string }[] = [
  { label: 'Meetings Today', value: '5', sub: '2 with Priority customers', icon: Calendar, color: '#E11414' },
  { label: 'Tasks Due', value: '8', sub: '3 overdue', icon: CheckSquare, color: '#F59E0B' },
  { label: 'Customers to Reach', value: '12', sub: '6 not contacted', icon: Users, color: '#6366F1' },
  { label: 'Pipeline Snapshot', value: 'HKD 597.6M', sub: '+12% vs last week', icon: DollarSign, color: '#10B981' },
]

/* ============================================================
   Dashboard — Top Suggestions
   ============================================================ */

const topSuggestions: { title: string; desc: string; button: string; icon: LucideIcon }[] = [
  { title: 'Prepare for your meeting at 11:00 AM', desc: 'You have a meeting with ABC Pte Ltd.', button: 'View Brief', icon: Calendar },
  { title: 'Follow up with 3 customers', desc: "These customers haven't been contacted in the last 14 days.", button: 'View Customers', icon: Users },
  { title: 'Explore new opportunities', desc: "We've identified 4 cross-sell opportunities for you.", button: 'View Opportunities', icon: TrendingUp },
]

/* ============================================================
   Dashboard — AI Command Prompt Preset Chips
   ============================================================ */



/* ============================================================
   Dashboard — Today's Schedule
   ============================================================ */

const todaySchedule: { time: string; title: string; tag: string; tagColor: string }[] = [
  { time: '09:30 AM', title: 'Meeting with Kelvin', tag: 'Relationship Review', tagColor: '#3B82F6' },
  { time: '11:00 AM', title: 'Client Gathering', tag: 'New Opportunity', tagColor: '#F97316' },
  { time: '02:00 PM', title: 'Internal Meeting', tag: 'Product Discussion', tagColor: '#8B5CF6' },
]

/* ============================================================
   Dashboard — Important Reminders
   ============================================================ */

const reminders: { text: string; due: string; icon: LucideIcon }[] = [
  { text: 'Submit your Weekly Update', due: 'Due today, 6:00 PM', icon: ClipboardList },
  { text: 'Complete AML e-Learning', due: 'Due in 3 days', icon: ShieldCheck },
  { text: 'Review 2 pending approvals', due: 'Due in 5 days', icon: FileCheck },
]

/* ============================================================
   Customer Data Model
   ============================================================ */

interface TimelineEntry {
  date: string
  event: string
  source: string
}

interface AltAction {
  title: string
  desc: string
  icon: 'mail' | 'webinar' | 'report'
}

interface Client {
  id: string
  rank: number
  name: string
  initials: string
  avatarUrl: string
  avatarColor: string
  segment: string
  segmentBadges: string[]
  relationshipValue: string
  investableAssets: string
  householdAum: string
  engagementScore: number
  priorityScore: number
  trigger: string
  triggerType: 'birthday' | 'cash' | 'portfolio' | 'travel' | 'kyc' | 'market' | 'anniversary'
  whyNow: string[]
  potentialImpact: string
  suggestedPurpose: string
  bestTime: string
  bestTimeNote: string
  nextStep: string
  timeline: TimelineEntry[]
  recentContext: { date: string; action: string; channel: string }[]
  altActions: AltAction[]
  nextMilestone: {
    type: 'kyc' | 'birthday' | 'portfolio' | 'travel' | 'cash' | 'market' | 'compliance' | 'anniversary'
    label: string
    dueDate: string
    daysLeft: number
  }
}

const clients: Client[] = [
  {
    id: 'tan-weiming',
    rank: 1,
    name: 'Tan Wei Ming',
    initials: 'TW',
    avatarUrl: 'https://images.unsplash.com/photo-1507006487514-4dfe5f5b3a9e?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#E11414',
    segment: 'Private Wealth',
    segmentBadges: ['Priority High', 'PB Professional'],
    relationshipValue: 'HKD 85.6M',
    investableAssets: 'HKD 62.3M',
    householdAum: 'HKD 120.1M',
    engagementScore: 92,
    priorityScore: 92,
    trigger: 'Upcoming birthday in 5 days',
    triggerType: 'birthday',
    whyNow: [
      'Birthday on Sep 8 — relationship-building opportunity',
      'Cash balance at HKD 12.4M, above target by 18%',
      'Last contacted 38 days ago',
    ],
    potentialImpact: 'High — client has upcoming liquidity event + relationship milestone. Proactive contact expected to increase wallet share by 8-12%.',
    suggestedPurpose: 'Relationship touchpoint + review excess liquidity options',
    bestTime: 'Tomorrow, 2:00 PM – 3:00 PM',
    bestTimeNote: 'Calendar shows free block after lunch meeting',
    nextStep: 'Schedule a 30-min call to wish him happy birthday and discuss short-term deposit options.',
    timeline: [
      { date: 'Sep 8, 2026', event: 'Birthday — relationship milestone', source: 'CRM' },
      { date: 'Aug 28', event: 'Cash balance detected above target', source: 'Core Banking' },
      { date: 'Aug 15', event: 'KYC documents verified — valid until 2027', source: 'KYC System' },
      { date: 'Jul 27', event: 'Last contact — quarterly review call', source: 'CRM' },
      { date: 'Jul 15', event: 'Portfolio rebalancing — reduced tech exposure', source: 'Market Data' },
    ],
    recentContext: [
      { date: 'Jul 27', action: 'Quarterly review call completed', channel: 'Phone' },
      { date: 'Jul 15', action: 'Portfolio rebalanced — reduced tech by 8%', channel: 'In-person' },
      { date: 'Jun 30', action: 'Sent market outlook report', channel: 'Email' },
      { date: 'Jun 12', action: 'Birthday gift sent — handwritten card', channel: 'Courier' },
    ],
    altActions: [
      { title: 'Send market update email', desc: 'Q3 market outlook + personalized portfolio summary', icon: 'mail' },
      { title: 'Invite to webinar', desc: 'Wealth planning seminar — Sep 12, 7:00 PM', icon: 'webinar' },
      { title: 'Share research report', desc: 'Asia tech sector deep-dive report', icon: 'report' },
    ],
    nextMilestone: { type: 'birthday', label: 'Birthday', dueDate: 'Sep 8, 2026', daysLeft: 5 },
  },
  {
    id: 'david-chan',
    rank: 2,
    name: 'David Chan',
    initials: 'DC',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a86a?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#6366F1',
    segment: 'Private Wealth',
    segmentBadges: ['Priority High', 'PB Professional'],
    relationshipValue: 'HKD 48.2M',
    investableAssets: 'HKD 35.1M',
    householdAum: 'HKD 52.7M',
    engagementScore: 88,
    priorityScore: 88,
    trigger: 'Excess cash + tech market dip',
    triggerType: 'cash',
    whyNow: [
      'Cash allocation 12% above target — deploy opportunity',
      'Nasdaq down 4.2% this week — entry point for tech equities',
      'Risk profile supports tactical allocation',
    ],
    potentialImpact: 'Medium-High — deploying excess cash into dipped sectors could yield 6-8% returns over 3 months.',
    suggestedPurpose: 'Rebalance portfolio — deploy excess cash into dipped tech sector',
    bestTime: 'Today, 4:00 PM – 5:00 PM',
    bestTimeNote: 'Markets close in 1 hour — act before EOD',
    nextStep: 'Send tactical allocation proposal with 3 fund options and schedule a review call.',
    timeline: [
      { date: 'Sep 3', event: 'Cash balance above target by 12%', source: 'Core Banking' },
      { date: 'Sep 1', event: 'Nasdaq down 4.2% — market dip detected', source: 'Market Data' },
      { date: 'Aug 20', event: 'KYC refresh completed', source: 'KYC System' },
      { date: 'Jul 28', event: 'Last contact — portfolio review', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 28', action: 'Portfolio review meeting', channel: 'In-person' },
      { date: 'Jul 10', action: 'Sent mid-year outlook', channel: 'Email' },
      { date: 'Jun 22', action: 'Risk profile reassessment', channel: 'Phone' },
    ],
    altActions: [
      { title: 'Send market update email', desc: 'Tech sector dip analysis + recovery patterns', icon: 'mail' },
      { title: 'Invite to webinar', desc: 'Market volatility seminar — Sep 10', icon: 'webinar' },
    ],
    nextMilestone: { type: 'portfolio', label: 'Portfolio Rebalance', dueDate: 'Sep 10, 2026', daysLeft: 7 },
  },
  {
    id: 'maya-lim',
    rank: 3,
    name: 'Maya Lim',
    initials: 'ML',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#10B981',
    segment: 'Family Office',
    segmentBadges: ['Priority Medium', 'Family Office'],
    relationshipValue: 'HKD 127.8M',
    investableAssets: 'HKD 95.4M',
    householdAum: 'HKD 210.3M',
    engagementScore: 84,
    priorityScore: 84,
    trigger: 'Portfolio concentration risk',
    triggerType: 'portfolio',
    whyNow: [
      'Single-sector exposure at 62% (REITs)',
      'Upcoming quarterly review — pre-empt concerns',
      'Last contacted 51 days ago',
    ],
    potentialImpact: 'High — concentration risk could lead to 8-12% drawdown if sector corrects. Early diversification preserves relationship trust.',
    suggestedPurpose: 'Diversification review — reduce REIT concentration',
    bestTime: 'Sep 5, 10:00 AM – 11:00 AM',
    bestTimeNote: 'Client prefers morning meetings',
    nextStep: 'Prepare diversification proposal with alternative sector allocations before review.',
    timeline: [
      { date: 'Sep 10', event: 'Quarterly review scheduled', source: 'CRM' },
      { date: 'Aug 30', event: 'REIT concentration at 62% — risk alert', source: 'Market Data' },
      { date: 'Aug 10', event: 'KYC valid — family office structure', source: 'KYC System' },
      { date: 'Jul 14', event: 'Last contact — quarterly review', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 14', action: 'Quarterly portfolio review', channel: 'In-person' },
      { date: 'Jun 20', action: 'Family trust structure update', channel: 'In-person' },
      { date: 'Jun 05', action: 'Sent REIT sector analysis', channel: 'Email' },
    ],
    altActions: [
      { title: 'Send sector report', desc: 'REIT concentration risk analysis', icon: 'report' },
      { title: 'Invite to webinar', desc: 'Family office diversification seminar', icon: 'webinar' },
    ],
    nextMilestone: { type: 'portfolio', label: 'Quarterly Review', dueDate: 'Sep 10, 2026', daysLeft: 7 },
  },
  {
    id: 'sarah-wong',
    rank: 4,
    name: 'Sarah Wong',
    initials: 'SW',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#F59E0B',
    segment: 'Priority Banking',
    segmentBadges: ['Priority Medium', 'PB Retail'],
    relationshipValue: 'HKD 18.4M',
    investableAssets: 'HKD 12.1M',
    householdAum: 'HKD 22.8M',
    engagementScore: 78,
    priorityScore: 78,
    trigger: 'Travel plans detected',
    triggerType: 'travel',
    whyNow: [
      'Upcoming trip to Tokyo — FX & travel insurance opportunity',
      'Card spend pattern indicates planning phase',
      'Cross-sell travel rewards card',
    ],
    potentialImpact: 'Medium — travel product cross-sell expected to generate HKD 50K+ in new revenue.',
    suggestedPurpose: 'Pre-travel financial check-up + product cross-sell',
    bestTime: 'Sep 4, 11:00 AM – 12:00 PM',
    bestTimeNote: 'Pre-departure window — 3 days before trip',
    nextStep: 'Offer multi-currency account setup, travel insurance, and Visa Travel card.',
    timeline: [
      { date: 'Sep 7', event: 'Travel to Tokyo detected', source: 'Core Banking' },
      { date: 'Aug 25', event: 'FX spend pattern — travel planning', source: 'Core Banking' },
      { date: 'Aug 15', event: 'KYC valid', source: 'KYC System' },
      { date: 'Jul 30', event: 'Last contact — card upgrade discussion', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 30', action: 'Card upgrade discussion', channel: 'Phone' },
      { date: 'Jul 12', action: 'Sent travel rewards comparison', channel: 'Email' },
    ],
    altActions: [
      { title: 'Send travel guide', desc: 'DBS travel benefits + FX rates for Tokyo', icon: 'mail' },
      { title: 'Invite to webinar', desc: 'Travel insurance + multi-currency session', icon: 'webinar' },
    ],
    nextMilestone: { type: 'travel', label: 'Tokyo Trip', dueDate: 'Sep 7, 2026', daysLeft: 4 },
  },
  {
    id: 'robert-lee',
    rank: 5,
    name: 'Robert Lee',
    initials: 'RL',
    avatarUrl: 'https://images.unsplash.com/photo-1472099643846-7b37c2c1c2e0?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#8B5CF6',
    segment: 'Private Wealth',
    segmentBadges: ['Priority Medium', 'PB Professional'],
    relationshipValue: 'HKD 42.7M',
    investableAssets: 'HKD 31.2M',
    householdAum: 'HKD 55.8M',
    engagementScore: 71,
    priorityScore: 71,
    trigger: 'KYC refresh due',
    triggerType: 'kyc',
    whyNow: [
      'KYC documents expiring in 14 days',
      'Compliance window requires action',
      'Last contacted 67 days ago — re-engagement needed',
    ],
    potentialImpact: 'High — compliance deadline. Missing KYC refresh risks account restrictions.',
    suggestedPurpose: 'Compliance + relationship re-engagement',
    bestTime: 'This week, flexible',
    bestTimeNote: 'No calendar constraints — urgent compliance deadline',
    nextStep: 'Send KYC checklist via secure portal and schedule a brief document review call.',
    timeline: [
      { date: 'Sep 17', event: 'KYC expiry deadline — 14 days', source: 'KYC System' },
      { date: 'Aug 20', event: 'Compliance alert generated', source: 'Core Banking' },
      { date: 'Jul 29', event: 'Last contact — annual review', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 29', action: 'Annual portfolio review', channel: 'In-person' },
      { date: 'Jul 01', action: 'Sent semi-annual statement', channel: 'Email' },
    ],
    altActions: [
      { title: 'Send KYC reminder', desc: 'Secure portal link + document checklist', icon: 'mail' },
    ],
    nextMilestone: { type: 'kyc', label: 'KYC Renewal', dueDate: 'Sep 17, 2026', daysLeft: 14 },
  },
  {
    id: 'grace-tan',
    rank: 6,
    name: 'Grace Tan',
    initials: 'GT',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-b5e9b6a4a0e2?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#EC4899',
    segment: 'Priority Banking',
    segmentBadges: ['Priority Low', 'PB Retail'],
    relationshipValue: 'HKD 12.3M',
    investableAssets: 'HKD 8.7M',
    householdAum: 'HKD 15.1M',
    engagementScore: 68,
    priorityScore: 68,
    trigger: 'Market volatility alert',
    triggerType: 'market',
    whyNow: [
      'Portfolio down 6% MTD — proactive reassurance needed',
      'High equity allocation (78%) — risk of churn',
      'Client called 2 weeks ago expressing concern',
    ],
    potentialImpact: 'Medium — proactive reassurance prevents churn and preserves AUM.',
    suggestedPurpose: 'Portfolio reassurance + risk tolerance reassessment',
    bestTime: 'Today, 3:00 PM – 4:00 PM',
    bestTimeNote: 'Client is actively monitoring markets — call promptly',
    nextStep: 'Prepare portfolio stress-test report and rebalancing options for immediate discussion.',
    timeline: [
      { date: 'Sep 3', event: 'Portfolio down 6% MTD — volatility alert', source: 'Market Data' },
      { date: 'Aug 20', event: 'Client called expressing concern', source: 'CRM' },
      { date: 'Aug 10', event: 'Equity allocation at 78% — above target', source: 'Core Banking' },
      { date: 'Jul 28', event: 'Last contact — concern call', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 28', action: 'Client concern call — market volatility', channel: 'Phone' },
      { date: 'Jul 10', action: 'Sent volatility briefing', channel: 'Email' },
    ],
    altActions: [
      { title: 'Send market update email', desc: 'Volatility outlook + reassurance note', icon: 'mail' },
      { title: 'Share research report', desc: 'Defensive allocation strategy paper', icon: 'report' },
    ],
    nextMilestone: { type: 'market', label: 'Volatility Review', dueDate: 'Sep 5, 2026', daysLeft: 2 },
  },
  // ── New Client 7: James Ong — KYC due in 6 days ──
  {
    id: 'james-ong',
    rank: 7,
    name: 'James Ong',
    initials: 'JO',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cb9baf9d9c12?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#0EA5E9',
    segment: 'Private Wealth',
    segmentBadges: ['Priority High', 'PB Professional'],
    relationshipValue: 'HKD 68.2M',
    investableAssets: 'HKD 45.3M',
    householdAum: 'HKD 142.3M',
    engagementScore: 90,
    priorityScore: 90,
    trigger: 'KYC due in 6 days',
    triggerType: 'kyc',
    whyNow: [
      'KYC review due in 6 days — compliance deadline',
      'HKD 5M cash balance detected — deployment opportunity',
      'No contact for 45 days — re-engagement needed',
    ],
    potentialImpact: 'High — opportunity to deepen relationship and deploy cash into suitable investment solutions.',
    suggestedPurpose: 'Schedule portfolio review this week',
    bestTime: 'Sep 5, 9:15 AM – 10:00 AM',
    bestTimeNote: 'Client prefers morning meetings before market open',
    nextStep: 'Schedule a portfolio review meeting, complete KYC refresh, and discuss cash deployment options.',
    timeline: [
      { date: 'Sep 3, 9:30 AM', event: 'KYC review due in 6 days', source: 'KYC System' },
      { date: 'Sep 3, 9:15 AM', event: 'Upcoming meeting next week', source: 'CRM' },
      { date: 'Aug 28', event: 'HKD 5M cash balance detected', source: 'Core Banking' },
      { date: 'Aug 15', event: 'Investment opportunity available — bond laddering', source: 'Market Data' },
      { date: 'Jul 20', event: 'No contact for 45 days', source: 'Call Reports' },
    ],
    recentContext: [
      { date: '17 Apr 2026', action: 'Phone call with client — discussed market outlook and portfolio', channel: 'Phone' },
      { date: '16 Apr 2026', action: 'Call report submitted — Portfolio Review Call', channel: 'Call Reports' },
      { date: '15 Apr 2026', action: 'Email from client — request for market update on US equities', channel: 'Email' },
      { date: '20 Jan 2026', action: 'KYC document received — proof of address updated', channel: 'KYC' },
    ],
    altActions: [
      { title: 'Send market update email', desc: 'Share CIO market insights via email', icon: 'mail' },
      { title: 'Invite to webinar', desc: 'Invite client to upcoming investment webinar', icon: 'webinar' },
      { title: 'No action', desc: 'Not recommended based on current signals', icon: 'report' },
    ],
    nextMilestone: { type: 'kyc', label: 'KYC Renewal', dueDate: 'Sep 9, 2026', daysLeft: 6 },
  },
  // ── New Client 8: Linda Cheung — Birthday + cash position ──
  {
    id: 'linda-cheung',
    rank: 8,
    name: 'Linda Cheung',
    initials: 'LC',
    avatarUrl: 'https://images.unsplash.com/photo-1554151221-97d6c15b4e5e?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#A855F7',
    segment: 'Priority Banking',
    segmentBadges: ['Priority Medium', 'PB Retail'],
    relationshipValue: 'HKD 24.8M',
    investableAssets: 'HKD 18.6M',
    householdAum: 'HKD 32.1M',
    engagementScore: 82,
    priorityScore: 82,
    trigger: 'Birthday in 3 days + excess cash',
    triggerType: 'birthday',
    whyNow: [
      'Birthday on Sep 6 — relationship touchpoint',
      'Cash position HKD 3.2M — 15% above target',
      'Due for semi-annual portfolio review',
    ],
    potentialImpact: 'Medium-High — birthday call + cash deployment proposal could increase wallet share.',
    suggestedPurpose: 'Birthday greeting + excess cash review',
    bestTime: 'Tomorrow, 10:00 AM – 11:00 AM',
    bestTimeNote: 'Client prefers morning calls',
    nextStep: 'Call to wish happy birthday, then discuss short-term deposit and bond ladder options.',
    timeline: [
      { date: 'Sep 6, 2026', event: 'Birthday — relationship milestone', source: 'CRM' },
      { date: 'Aug 25', event: 'Cash position 15% above target', source: 'Core Banking' },
      { date: 'Aug 10', event: 'KYC verified — valid until 2028', source: 'KYC System' },
      { date: 'Jul 18', event: 'Last contact — semi-annual review', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 18', action: 'Semi-annual portfolio review', channel: 'In-person' },
      { date: 'Jul 01', action: 'Sent birthday gift preview options', channel: 'Email' },
      { date: 'Jun 15', action: 'Risk profile update', channel: 'Phone' },
    ],
    altActions: [
      { title: 'Send market update email', desc: 'Personalized birthday + market briefing', icon: 'mail' },
      { title: 'Invite to webinar', desc: 'Wealth planning seminar — Sep 20', icon: 'webinar' },
    ],
    nextMilestone: { type: 'birthday', label: 'Birthday', dueDate: 'Sep 6, 2026', daysLeft: 3 },
  },
  // ── New Client 9: Henry Goh — Portfolio concentration risk ──
  {
    id: 'henry-goh',
    rank: 9,
    name: 'Henry Goh',
    initials: 'HG',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94e8eaa275c9?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#F97316',
    segment: 'Private Wealth',
    segmentBadges: ['Priority Medium', 'PB Professional'],
    relationshipValue: 'HKD 56.4M',
    investableAssets: 'HKD 40.1M',
    householdAum: 'HKD 78.9M',
    engagementScore: 79,
    priorityScore: 79,
    trigger: 'Portfolio concentration in China tech',
    triggerType: 'portfolio',
    whyNow: [
      'China tech exposure at 58% — above 40% threshold',
      'Regulatory crackdown risk in sector',
      'Quarterly review due in 2 weeks',
    ],
    potentialImpact: 'High — concentration risk could lead to 10-15% drawdown if sector corrects.',
    suggestedPurpose: 'Diversification review — reduce China tech concentration',
    bestTime: 'Sep 7, 2:00 PM – 3:00 PM',
    bestTimeNote: 'Client available after lunch',
    nextStep: 'Prepare diversification proposal with ASEAN and dividend stock alternatives.',
    timeline: [
      { date: 'Sep 3', event: 'China tech concentration at 58% — risk alert', source: 'Market Data' },
      { date: 'Aug 20', event: 'Quarterly review scheduled', source: 'CRM' },
      { date: 'Aug 05', event: 'KYC valid — corporate structure', source: 'KYC System' },
      { date: 'Jul 22', event: 'Last contact — portfolio check', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 22', action: 'Portfolio check call', channel: 'Phone' },
      { date: 'Jul 05', action: 'Sent China tech regulatory update', channel: 'Email' },
      { date: 'Jun 18', action: 'Annual review meeting', channel: 'In-person' },
    ],
    altActions: [
      { title: 'Send sector report', desc: 'China tech concentration risk analysis', icon: 'report' },
      { title: 'Invite to webinar', desc: 'ASEAN diversification seminar — Sep 15', icon: 'webinar' },
    ],
    nextMilestone: { type: 'portfolio', label: 'Quarterly Review', dueDate: 'Sep 17, 2026', daysLeft: 14 },
  },
  // ── New Client 10: Patricia Lim — Anniversary + compliance ──
  {
    id: 'patricia-lim',
    rank: 10,
    name: 'Patricia Lim',
    initials: 'PL',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d8e5f4e3cd?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#14B8A6',
    segment: 'Family Office',
    segmentBadges: ['Priority High', 'Family Office'],
    relationshipValue: 'HKD 98.5M',
    investableAssets: 'HKD 72.3M',
    householdAum: 'HKD 185.6M',
    engagementScore: 87,
    priorityScore: 87,
    trigger: 'Relationship anniversary + trust renewal',
    triggerType: 'anniversary',
    whyNow: [
      '10-year banking anniversary — relationship milestone',
      'Family trust renewal due in 3 weeks',
      'New tax regulations affect trust structure',
    ],
    potentialImpact: 'High — trust renewal + tax planning could preserve HKD 12M+ in tax efficiency.',
    suggestedPurpose: 'Trust renewal review + tax optimization',
    bestTime: 'Sep 8, 10:00 AM – 11:30 AM',
    bestTimeNote: 'Client requested extended meeting slot',
    nextStep: 'Schedule trust renewal review with legal team and discuss tax optimization strategies.',
    timeline: [
      { date: 'Sep 10, 2026', event: '10-year banking anniversary', source: 'CRM' },
      { date: 'Sep 24', event: 'Family trust renewal deadline', source: 'KYC System' },
      { date: 'Aug 15', event: 'New tax regulation impact assessment', source: 'Market Data' },
      { date: 'Jul 30', event: 'Last contact — trust structure briefing', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 30', action: 'Trust structure briefing', channel: 'In-person' },
      { date: 'Jul 12', action: 'Tax regulation summary sent', channel: 'Email' },
      { date: 'Jun 25', action: 'Family office quarterly review', channel: 'In-person' },
    ],
    altActions: [
      { title: 'Send market update email', desc: 'Tax regulation changes + trust impact', icon: 'mail' },
      { title: 'Invite to webinar', desc: 'Family office tax planning seminar', icon: 'webinar' },
    ],
    nextMilestone: { type: 'anniversary', label: 'Trust Renewal', dueDate: 'Sep 24, 2026', daysLeft: 21 },
  },
  // ── New Client 11: Kelvin Tan — Travel + FX opportunity ──
  {
    id: 'kelvin-tan',
    rank: 11,
    name: 'Kelvin Tan',
    initials: 'KT',
    avatarUrl: 'https://images.unsplash.com/photo-1521119983815-3a6a69e6c8b9?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#3B82F6',
    segment: 'Priority Banking',
    segmentBadges: ['Priority Low', 'PB Retail'],
    relationshipValue: 'HKD 15.2M',
    investableAssets: 'HKD 10.8M',
    householdAum: 'HKD 19.4M',
    engagementScore: 74,
    priorityScore: 74,
    trigger: 'Overseas property purchase — FX need',
    triggerType: 'travel',
    whyNow: [
      'GBP spend pattern — London property purchase detected',
      'HKD 8M transfer pending — FX timing critical',
      'Multi-currency account setup needed',
    ],
    potentialImpact: 'Medium — FX timing could save HKD 200K+ on exchange rate.',
    suggestedPurpose: 'Pre-property purchase FX + banking review',
    bestTime: 'Sep 4, 11:00 AM – 12:00 PM',
    bestTimeNote: 'Client has tight deadline — completion date Sep 15',
    nextStep: 'Offer multi-currency account, forward FX contract, and property financing consultation.',
    timeline: [
      { date: 'Sep 3', event: 'GBP HKD 8M transfer pending', source: 'Core Banking' },
      { date: 'Aug 28', event: 'London property completion — Sep 15', source: 'CRM' },
      { date: 'Aug 12', event: 'KYC valid', source: 'KYC System' },
      { date: 'Jul 25', event: 'Last contact — investment review', source: 'CRM' },
    ],
    recentContext: [
      { date: 'Jul 25', action: 'Investment review call', channel: 'Phone' },
      { date: 'Jul 08', action: 'FX rate comparison sent', channel: 'Email' },
    ],
    altActions: [
      { title: 'Send FX guide', desc: 'GBP/HKD forward rates + timing strategy', icon: 'mail' },
      { title: 'Invite to webinar', desc: 'Property investment + financing session', icon: 'webinar' },
    ],
    nextMilestone: { type: 'travel', label: 'Property Completion', dueDate: 'Sep 15, 2026', daysLeft: 12 },
  },
  // ── New Client 12: Wendy Chua — Market volatility + churn risk ──
  {
    id: 'wendy-chua',
    rank: 12,
    name: 'Wendy Chua',
    initials: 'WC',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-23f5e94a3e14?w=200&h=200&fit=crop&crop=face',
    avatarColor: '#EF4444',
    segment: 'Priority Banking',
    segmentBadges: ['Priority Medium', 'PB Retail'],
    relationshipValue: 'HKD 21.3M',
    investableAssets: 'HKD 14.7M',
    householdAum: 'HKD 26.8M',
    engagementScore: 76,
    priorityScore: 76,
    trigger: 'Portfolio down 8% — churn risk',
    triggerType: 'market',
    whyNow: [
      'Portfolio down 8% MTD — client expressed concern',
      'Equity allocation at 82% — above 70% target',
      'Competitor bank approached client — churn risk',
    ],
    potentialImpact: 'High — proactive retention call critical. AUM loss risk: HKD 21M.',
    suggestedPurpose: 'Retention call + portfolio rebalancing',
    bestTime: 'Today, 4:00 PM – 5:00 PM',
    bestTimeNote: 'Client is actively considering transfer — urgent',
    nextStep: 'Prepare retention proposal with fee waiver and defensive portfolio reallocation.',
    timeline: [
      { date: 'Sep 3', event: 'Portfolio down 8% MTD — churn risk alert', source: 'Market Data' },
      { date: 'Aug 25', event: 'Competitor bank inquiry detected', source: 'CRM' },
      { date: 'Aug 18', event: 'Client concern call logged', source: 'Call Reports' },
      { date: 'Jul 22', event: 'KYC valid', source: 'KYC System' },
    ],
    recentContext: [
      { date: 'Aug 18', action: 'Client concern call — considering transfer', channel: 'Phone' },
      { date: 'Aug 05', action: 'Sent volatility briefing', channel: 'Email' },
      { date: 'Jul 20', action: 'Annual review meeting', channel: 'In-person' },
    ],
    altActions: [
      { title: 'Send market update email', desc: 'Defensive strategy + retention offer', icon: 'mail' },
      { title: 'Share research report', desc: 'Low-volatility allocation paper', icon: 'report' },
    ],
    nextMilestone: { type: 'market', label: 'Volatility Review', dueDate: 'Sep 5, 2026', daysLeft: 2 },
  },
]

/* ============================================================
   Meeting Pack — Types & OpenRouter Integration
   ============================================================ */

interface AgendaItem {
  time: string
  topic: string
}

interface PitchPackData {
  executiveSummary: string
  keyPriorities: string[]
  recentHighlights: string[]
  opportunities: string[]
  portfolioSnapshot: {
    equitiesPercent: number
    fixedIncomePercent: number
    cashPercent: number
    alternativesPercent: number
    notes: string
    totalValue: string
    ytdReturn: string
  }
  riskProfile: string
  suggestedQuestions: string[]
  agenda: AgendaItem[]
}

// API key is stored in .env.local as VITE_OPENROUTER_API_KEY
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY ?? ''
const OPENROUTER_MODEL = 'google/gemini-2.0-flash-exp:free'
const OPENROUTER_FALLBACK_MODEL = 'meta-llama/llama-3.3-70b-instruct:free'

/**
 * fetchPitchPack — calls OpenRouter API for AI-generated meeting pack.
 * Uses Gemini 2.0 Flash (free tier) with Llama 3.3 70B fallback.
 * Returns 6 structured sections for the meeting pack page.
 */
async function fetchPitchPack(client: Client): Promise<PitchPackData> {
  const systemPrompt = `You are an AI wealth management assistant for a Relationship Manager at DBS Bank. Generate a comprehensive meeting pack for the client. Respond ONLY in JSON with these exact keys:
{
  "executiveSummary": "A high-level overview of the relationship, current sentiment, and strategic goals (2-3 sentences)",
  "keyPriorities": ["Array of 3-5 urgent client needs"],
  "recentHighlights": ["Array of 3-5 chronological key touchpoints, transactions, or portfolio adjustments"],
  "opportunities": ["Array of 3-5 AI-recommended wealth management ideas"],
  "portfolioSnapshot": {
    "equitiesPercent": 45,
    "fixedIncomePercent": 35,
    "cashPercent": 10,
    "alternativesPercent": 10,
    "notes": "Brief commentary on allocation",
    "totalValue": "HKD 3.42M",
    "ytdReturn": "+8.6%"
  },
  "riskProfile": "Moderate",
  "suggestedQuestions": ["Array of 3-5 strategic client discovery questions"],
  "agenda": [
    {"time": "10 mins", "topic": "Market Update"},
    {"time": "15 mins", "topic": "Portfolio Review"},
    {"time": "5 mins", "topic": "Next Steps"}
  ]
}
Return ONLY valid JSON, no markdown fences.`

  const userPrompt = `Generate a meeting pack for client ${client.name}.
Segment: ${client.segment}.
Market trigger: ${client.trigger}.
AUM: ${client.relationshipValue}.
Investable assets: ${client.investableAssets}.
Household AUM: ${client.householdAum}.
Suggested purpose: ${client.suggestedPurpose}.
Why now: ${client.whyNow.join('; ')}.
Potential impact: ${client.potentialImpact}.
Recommended next step: ${client.nextStep}.
Recent context: ${client.recentContext.map((c) => `${c.date}: ${c.action} (${c.channel})`).join('; ')}.
Next key milestone: ${client.nextMilestone.label} due ${client.nextMilestone.dueDate} (${client.nextMilestone.daysLeft} days remaining).`

  async function callAPI(model: string): Promise<string> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'DBS RM Command Centre',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  function parsePack(raw: string): PitchPackData {
    const parsed = JSON.parse(raw)
    return {
      executiveSummary: parsed.executiveSummary ?? '',
      keyPriorities: Array.isArray(parsed.keyPriorities) ? parsed.keyPriorities : [],
      recentHighlights: Array.isArray(parsed.recentHighlights) ? parsed.recentHighlights : [],
      opportunities: Array.isArray(parsed.opportunities) ? parsed.opportunities : [],
      portfolioSnapshot: {
        equitiesPercent: parsed.portfolioSnapshot?.equitiesPercent ?? 0,
        fixedIncomePercent: parsed.portfolioSnapshot?.fixedIncomePercent ?? 0,
        cashPercent: parsed.portfolioSnapshot?.cashPercent ?? 0,
        alternativesPercent: parsed.portfolioSnapshot?.alternativesPercent ?? 0,
        notes: parsed.portfolioSnapshot?.notes ?? '',
        totalValue: parsed.portfolioSnapshot?.totalValue ?? '',
        ytdReturn: parsed.portfolioSnapshot?.ytdReturn ?? '',
      },
      riskProfile: parsed.riskProfile ?? 'Moderate',
      suggestedQuestions: Array.isArray(parsed.suggestedQuestions) ? parsed.suggestedQuestions : [],
      agenda: Array.isArray(parsed.agenda) ? parsed.agenda : [],
    }
  }

  try {
    const raw = await callAPI(OPENROUTER_MODEL)
    return parsePack(raw)
  } catch {
    try {
      const raw = await callAPI(OPENROUTER_FALLBACK_MODEL)
      return parsePack(raw)
    } catch {
      // Final fallback: generate from client data
      return {
        executiveSummary: `${client.name} is a ${client.segment} client with ${client.relationshipValue} in relationship value. Current trigger: ${client.trigger}. ${client.potentialImpact} Strategic goal: ${client.suggestedPurpose}.`,
        keyPriorities: [
          ...client.whyNow,
          `${client.nextMilestone.label} due ${client.nextMilestone.dueDate} (${client.nextMilestone.daysLeft} days remaining)`,
        ],
        recentHighlights: client.recentContext.map((c) => `${c.date}: ${c.action} (${c.channel})`),
        opportunities: [
          `${client.suggestedPurpose}`,
          'Structured notes for yield enhancement',
          'FX hedging strategy for multi-currency exposure',
          'Alternative asset diversification',
        ],
        portfolioSnapshot: {
          equitiesPercent: 45,
          fixedIncomePercent: 35,
          cashPercent: 10,
          alternativesPercent: 10,
          notes: `Allocation aligned with ${client.segment} segment. Cash position reflects current trigger: ${client.trigger}.`,
          totalValue: client.relationshipValue,
          ytdReturn: '+7.8%',
        },
        riskProfile: 'Moderate',
        suggestedQuestions: [
          'How do you feel about your portfolio performance so far?',
          'Are there any changes in your financial goals or family situation?',
          'What concerns do you have about the current market environment?',
          'Would you like to explore any new investment opportunities?',
        ],
        agenda: [
          { time: '10 mins', topic: 'Market Update & Sentiment Check' },
          { time: '15 mins', topic: `Portfolio Review — ${client.suggestedPurpose}` },
          { time: '5 mins', topic: 'Next Steps & Action Items' },
        ],
      }
    }
  }
}

/* ============================================================
   Magic Box — AI Natural Language Filter/Sort
   ============================================================ */

interface MagicMatch {
  customerId: string
  matchReason: string
}

interface MagicResult {
  sortedIds: MagicMatch[]
  aiSummary: string
}

/**
 * fetchMagicSort — sends client list + NL prompt to OpenRouter.
 * Returns re-ordered customer IDs with match reasons + AI summary.
 */
async function fetchMagicSort(prompt: string, clientList: Client[]): Promise<MagicResult> {
  const systemPrompt = `You are an AI assistant for a DBS Wealth Relationship Manager. Given a list of customer objects and a user request, re-order and filter the customer array to match the request. Return ONLY valid JSON (no markdown fences) with this exact schema:
{
  "sortedIds": [{"customerId": "the-client-id", "matchReason": "brief reason this client matches"}],
  "aiSummary": "One sentence explaining the sorting/filtering logic"
}
Only include customer IDs that exist in the provided list. If no clients match, return an empty sortedIds array with an explanation in aiSummary.`

  const compactClients = clientList.map((c) => ({
    id: c.id,
    name: c.name,
    segment: c.segment,
    relationshipValue: c.relationshipValue,
    investableAssets: c.investableAssets,
    householdAum: c.householdAum,
    engagementScore: c.engagementScore,
    priorityScore: c.priorityScore,
    trigger: c.trigger,
    triggerType: c.triggerType,
    whyNow: c.whyNow,
    nextStep: c.nextStep,
    recentContext: c.recentContext,
  }))

  const userPrompt = `User request: "${prompt}"

Customer data (JSON):
${JSON.stringify(compactClients)}

Re-order and/or filter these customers to match the user's request. Return ONLY valid JSON.`

  async function callAPI(model: string): Promise<string> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'DBS RM Command Centre',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  function parseResult(raw: string): MagicResult {
    const parsed = JSON.parse(raw)
    return {
      sortedIds: Array.isArray(parsed.sortedIds)
        ? parsed.sortedIds.map((m: { customerId: string; matchReason: string }) => ({
            customerId: m.customerId ?? '',
            matchReason: m.matchReason ?? '',
          }))
        : [],
      aiSummary: parsed.aiSummary ?? '',
    }
  }

  try {
    const raw = await callAPI(OPENROUTER_MODEL)
    return parseResult(raw)
  } catch {
    try {
      const raw = await callAPI(OPENROUTER_FALLBACK_MODEL)
      return parseResult(raw)
    } catch {
      // Fallback: local heuristic sorting based on keywords
      return localHeuristicSort(prompt, clientList)
    }
  }
}

/** Local fallback: keyword-based sorting when API is unavailable */
function localHeuristicSort(prompt: string, clientList: Client[]): MagicResult {
  const lower = prompt.toLowerCase()
  let sorted: Client[] = [...clientList]
  let summary = ''

  if (lower.includes('birthday')) {
    sorted = clientList.filter((c) => c.triggerType === 'birthday')
    summary = 'Filtered for clients with upcoming birthdays.'
  } else if (lower.includes('cash') || lower.includes('excess')) {
    sorted = [...clientList].sort((a, b) => (b.triggerType === 'cash' ? 1 : 0) - (a.triggerType === 'cash' ? 1 : 0))
    summary = 'Prioritized clients with excess cash positions.'
  } else if (lower.includes('kyc')) {
    sorted = clientList.filter((c) => c.triggerType === 'kyc')
    summary = 'Filtered for clients with KYC refresh due.'
  } else if (lower.includes('volatil') || lower.includes('market')) {
    sorted = clientList.filter((c) => c.triggerType === 'market')
    summary = 'Filtered for clients with market volatility alerts.'
  } else if (lower.includes('aum') || lower.includes('50m')) {
    sorted = [...clientList]
      .filter((c) => {
        const num = parseFloat(c.relationshipValue.replace(/[^0-9.]/g, ''))
        return num >= 50
      })
      .sort((a, b) => {
        const na = parseFloat(a.relationshipValue.replace(/[^0-9.]/g, ''))
        const nb = parseFloat(b.relationshipValue.replace(/[^0-9.]/g, ''))
        return nb - na
      })
    summary = 'Filtered for clients with AUM above HKD 50M, sorted by AUM.'
  } else {
    sorted = [...clientList].sort((a, b) => b.priorityScore - a.priorityScore)
    summary = 'Sorted by priority score (default).'
  }

  return {
    sortedIds: sorted.map((c) => ({
      customerId: c.id,
      matchReason: c.trigger,
    })),
    aiSummary: summary,
  }
}

/* ============================================================
   AI Chatbot — OpenRouter Chat Integration
   ============================================================ */

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * localChatResponse — smart keyword-matched fallback when API is unavailable.
 * Matches keywords like "KYC", "birthdays", "meetings", "pipeline", "tasks",
 * "priority", "market", "cross-sell" and returns realistic mock answers using
 * the RM's live client data.
 */
function localChatResponse(userText: string, clientContext: Client[]): string {
  const lower = userText.toLowerCase()

  // ── KYC ──
  if (lower.includes('kyc')) {
    const kycClients = clientContext.filter((c) => c.triggerType === 'kyc' || c.nextMilestone.type === 'kyc')
    const names = kycClients.length > 0 ? kycClients.map((c) => `• ${c.name} — ${c.nextMilestone.label} (${c.nextMilestone.daysLeft} days left)`) : clientContext.slice(0, 2).map((c) => `• ${c.name} — KYC review pending`)
    return `Here are the clients needing urgent KYC updates:\n${names.join('\n')}\n\nI recommend reaching out to schedule their KYC refresh appointments this week.`
  }

  // ── Birthdays ──
  if (lower.includes('birthday')) {
    const bdayClients = clientContext.filter((c) => c.triggerType === 'birthday' || c.nextMilestone.type === 'birthday')
    const names = bdayClients.length > 0 ? bdayClients.map((c) => `• ${c.name} — ${c.nextMilestone.label} on ${c.nextMilestone.dueDate}`) : clientContext.slice(0, 3).map((c) => `• ${c.name} — Upcoming birthday`)
    return `Upcoming client birthdays:\n${names.join('\n')}\n\nConsider sending a personalised greeting or gift to strengthen the relationship.`
  }

  // ── Meetings / Schedule ──
  if (lower.includes('meeting') || lower.includes('schedule') || lower.includes('today')) {
    return `Here's your meeting schedule for today:\n• 09:30 AM — XYZ Corporation (Relationship Review)\n• 11:00 AM — ABC Pte Ltd (New Opportunity)\n• 02:00 PM — LMN Group (Product Discussion)\n\nYou also have 2 more meetings later. Would you like me to prepare a brief for any of these?`
  }

  // ── Pipeline ──
  if (lower.includes('pipeline')) {
    return `Your current pipeline snapshot:\n• Total Potential Value: SGD 8.6M\n• Growth: +12% vs last week\n• Top opportunity: ${clientContext[0]?.name ?? 'ABC Pte Ltd'} — ${clientContext[0]?.potentialImpact ?? 'High-value cross-sell'}\n• 4 cross-sell opportunities identified\n\nWould you like a detailed breakdown by segment?`
  }

  // ── Tasks ──
  if (lower.includes('task') || lower.includes('todo') || lower.includes('due')) {
    return `You have 8 tasks due today:\n• 3 are overdue — please prioritise these first\n• Submit your Weekly Update (due today, 6:00 PM)\n• Complete AML e-Learning (due in 3 days)\n• Review 2 pending approvals (due in 5 days)\n\nShall I sort these by priority or due date?`
  }

  // ── Priority actions ──
  if (lower.includes('priority') || lower.includes('action') || lower.includes('brief')) {
    const top3 = clientContext.slice(0, 3)
    return `Here are your top priority actions for today:\n${top3.map((c, i) => `${i + 1}. ${c.name} — ${c.trigger}\n   ${c.nextStep}`).join('\n')}\n\nThese clients have the highest engagement scores and should be contacted first.`
  }

  // ── Market insights ──
  if (lower.includes('market') || lower.includes('insight') || lower.includes('week')) {
    return `Here are this week's key market insights:\n• HK tech sector saw a 3.2% dip — consider rebalancing exposed clients\n• SGD fixed income yields remain attractive at 3.8-4.2%\n• Gold up 2.1% on safe-haven demand\n• USD/SGD stable around 1.34\n\nWould you like talking points for any specific client conversation?`
  }

  // ── Cross-sell ──
  if (lower.includes('cross-sell') || lower.includes('opportunity') || lower.includes('opportunities')) {
    return `I've identified 4 cross-sell opportunities:\n• ${clientContext[0]?.name ?? 'Tan Wei Ming'} — Structured notes for yield enhancement\n• ${clientContext[1]?.name ?? 'Siti Rahim'} — FX hedging for multi-currency exposure\n• ${clientContext[2]?.name ?? 'James Wong'} — Alternative asset diversification\n• ${clientContext[3]?.name ?? 'Mei Ling'} — Insurance-linked product for wealth protection\n\nShall I prepare a brief for any of these?`
  }

  // ── Default fallback ──
  return `I'm here to help with your daily RM activities. You can ask me about:\n• Priority actions and daily briefings\n• Client lookups and summaries\n• Pipeline and opportunities\n• Meeting preparation and talking points\n• KYC updates and compliance tasks\n\nWhat would you like to explore?`
}

/**
 * fetchChatResponse — sends chat history to OpenRouter, returns AI reply.
 * Falls back to smart local keyword-matched responses if API is unavailable.
 */
async function fetchChatResponse(
  messages: ChatMessage[],
  clientContext: Client[]
): Promise<string> {
  const systemPrompt = `You are the DBS AI Assistant for a Relationship Manager. You help with:
- Priority actions and daily briefings
- Client lookup and summaries
- Wealth management advice (markets, products, compliance)
- Talking points for client meetings

Here is the RM's current client portfolio for context:
${JSON.stringify(clientContext.map((c) => ({ name: c.name, segment: c.segment, aum: c.relationshipValue, trigger: c.trigger, whyNow: c.whyNow, nextStep: c.nextStep })), null, 2)}

Be concise, professional, and actionable. Use bullet points where appropriate.`

  async function callAPI(model: string): Promise<string> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'DBS RM Command Centre',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } finally {
      clearTimeout(timeout)
    }
  }

  // Get the latest user message for local fallback
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')

  try {
    return await callAPI(OPENROUTER_MODEL)
  } catch {
    try {
      return await callAPI(OPENROUTER_FALLBACK_MODEL)
    } catch {
      // Smart local fallback — keyword-matched realistic responses
      if (lastUserMsg) {
        return localChatResponse(lastUserMsg.content, clientContext)
      }
      return localChatResponse('', clientContext)
    }
  }
}

/* ============================================================
   HTML Presentation Generator (legacy — dead code, retained for
   potential future use). Generates a self-contained styled HTML
   file from the meeting pack + client data.
   ============================================================ */

// @ts-expect-error - legacy dead code retained for potential future use
function generateHTMLPresentation(client: Client, pack: PitchPackData, emailText: string, pointsText: string): string {
  const talkingPointsHtml = pointsText
    .split('\n')
    .filter((line) => line.trim())
    .map((line, i) => `<li><span class="point-num">${i + 1}</span><span class="point-text">${escapeHtml(line)}</span></li>`)
    .join('\n')

  const timelineHtml = client.timeline
    .map(
      (entry) => `
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-content">
          <div class="tl-date">${escapeHtml(entry.date)}</div>
          <div class="tl-event">${escapeHtml(entry.event)}</div>
          <div class="tl-source">${escapeHtml(entry.source)}</div>
        </div>
      </div>`
    )
    .join('')

  const whyNowHtml = client.whyNow.map((item) => `<li>${escapeHtml(item)}</li>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Outreach Pack — ${escapeHtml(client.name)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: #F4F5F7; color: #18181B; line-height: 1.6;
  }
  .container { max-width: 900px; margin: 0 auto; padding: 40px 24px; }

  /* Cover Header */
  .cover {
    background: linear-gradient(135deg, #E11414 0%, #B00D0D 100%);
    color: #FFFFFF; padding: 48px 40px; border-radius: 12px;
    margin-bottom: 32px; position: relative; overflow: hidden;
  }
  .cover::after {
    content: ''; position: absolute; top: 0; right: 0; width: 300px; height: 100%;
    background: rgba(255,255,255,0.05); transform: skewX(-15deg);
  }
  .cover-logo { font-size: 14px; font-weight: 700; letter-spacing: 0.1em; opacity: 0.8; margin-bottom: 24px; }
  .cover h1 { font-size: 36px; font-weight: 700; margin-bottom: 8px; }
  .cover .subtitle { font-size: 16px; opacity: 0.85; margin-bottom: 32px; }
  .cover-kpis { display: flex; gap: 32px; flex-wrap: wrap; }
  .cover-kpi label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.7; margin-bottom: 4px; }
  .cover-kpi strong { font-size: 20px; font-weight: 700; }

  /* Section Cards */
  .card {
    background: #FFFFFF; border-radius: 10px; padding: 32px;
    margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  .card h2 {
    font-size: 14px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: #E11414; margin-bottom: 20px;
    padding-bottom: 12px; border-bottom: 2px solid #F4F5F7;
  }

  /* Why Now */
  .why-now ul { list-style: none; }
  .why-now li {
    position: relative; padding: 10px 0 10px 28px;
    font-size: 15px; color: #374151; border-bottom: 1px solid #F4F5F7;
  }
  .why-now li:last-child { border-bottom: none; }
  .why-now li::before {
    content: ''; position: absolute; left: 0; top: 16px;
    width: 8px; height: 8px; border-radius: 50%; background: #E11414;
  }

  /* Email Draft */
  .email-body {
    background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px;
    padding: 24px; font-size: 14px; color: #374151; white-space: pre-wrap;
  }

  /* Talking Points */
  .talking-points ul { list-style: none; }
  .talking-points li {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid #F4F5F7;
  }
  .talking-points li:last-child { border-bottom: none; }
  .point-num {
    flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%;
    background: #E11414; color: #FFFFFF; font-size: 13px; font-weight: 700;
    display: grid; place-items: center;
  }
  .point-text { font-size: 15px; color: #374151; padding-top: 3px; }

  /* Product Summary */
  .product-box {
    background: linear-gradient(135deg, #FEF2F2 0%, #FCE7E7 100%);
    border: 1px solid #FECACA; border-radius: 8px; padding: 20px 24px;
    font-size: 15px; color: #991B1B; line-height: 1.7;
  }

  /* Timeline */
  .timeline { position: relative; padding-left: 8px; }
  .timeline::before {
    content: ''; position: absolute; left: 7px; top: 8px; bottom: 8px;
    width: 2px; background: #E5E7EB;
  }
  .tl-item { position: relative; padding: 0 0 24px 28px; }
  .tl-item:last-child { padding-bottom: 0; }
  .tl-dot {
    position: absolute; left: 0; top: 6px; width: 16px; height: 16px;
    border-radius: 50%; background: #E11414; border: 3px solid #FFFFFF;
    box-shadow: 0 0 0 2px #E11414;
  }
  .tl-date { font-size: 13px; font-weight: 700; color: #E11414; margin-bottom: 2px; }
  .tl-event { font-size: 15px; color: #18181B; margin-bottom: 4px; }
  .tl-source { font-size: 12px; color: #6B7280; font-style: italic; }

  /* Footer */
  .footer {
    text-align: center; padding: 24px; font-size: 12px;
    color: #9CA3AF; border-top: 1px solid #E5E7EB; margin-top: 8px;
  }
  .footer strong { color: #E11414; }

  /* Print */
  @media print {
    body { background: #FFFFFF; }
    .container { max-width: none; padding: 0; }
    .card { box-shadow: none; page-break-inside: avoid; }
    .cover { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="container">

  <!-- Cover -->
  <div class="cover">
    <div class="cover-logo">DBS &middot; PRIVATE WEALTH</div>
    <h1>Outreach Meeting Pack</h1>
    <div class="subtitle">${escapeHtml(client.name)} &mdash; ${escapeHtml(client.trigger)}</div>
    <div class="cover-kpis">
      <div class="cover-kpi">
        <label>Segment</label>
        <strong>${escapeHtml(client.segment)}</strong>
      </div>
      <div class="cover-kpi">
        <label>Relationship Value</label>
        <strong>${escapeHtml(client.relationshipValue)}</strong>
      </div>
      <div class="cover-kpi">
        <label>Investable Assets</label>
        <strong>${escapeHtml(client.investableAssets)}</strong>
      </div>
      <div class="cover-kpi">
        <label>Priority Score</label>
        <strong>${client.priorityScore}/100</strong>
      </div>
    </div>
  </div>

  <!-- Why Now -->
  <div class="card why-now">
    <h2>Why Reach Out Now</h2>
    <ul>${whyNowHtml}</ul>
  </div>

  <!-- Email Draft -->
  <div class="card">
    <h2>Email Draft</h2>
    <div class="email-body">${escapeHtml(emailText)}</div>
  </div>

  <!-- Talking Points -->
  <div class="card talking-points">
    <h2>Meeting Talking Points</h2>
    <ul>${talkingPointsHtml}</ul>
  </div>

  <!-- Product Summary -->
  <div class="card">
    <h2>Product Suggestion Summary</h2>
    <div class="product-box">${escapeHtml(pack.opportunities.join('; '))}</div>
  </div>

  <!-- Trigger Timeline -->
  <div class="card">
    <h2>Trigger Timeline</h2>
    <div class="timeline">${timelineHtml}</div>
  </div>

  <div class="footer">
    Generated by <strong>DBS RM Command Centre</strong> &middot; AI Outreach Pack
    &middot; ${new Date().toLocaleString('en-SG', { dateStyle: 'long', timeStyle: 'short' })}
  </div>

</div>
</body>
</html>`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/* ============================================================
   DBS Logo
   ============================================================ */

function DBSLogo() {
  return <img src="/dbs-logo-white.png" alt="DBS logo" className="dbs-logo-img" />
}

/* ============================================================
   Avatar Component (image with initials fallback)
   ============================================================ */

function ClientAvatar({ client, size }: { client: Client; size: 'sm' | 'md' | 'lg' }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className={`client-avatar avatar-${size}`} style={{ background: client.avatarColor }}>
        {client.initials}
      </div>
    )
  }

  return (
    <img
      src={client.avatarUrl}
      alt={client.name}
      className={`client-avatar avatar-${size}`}
      style={{ background: client.avatarColor }}
      onError={() => setImgError(true)}
    />
  )
}

/* ============================================================
   Meeting Pack Page — Redesigned per reference layout
   ============================================================ */

function MeetingPackPage({ client, onBack }: { client: Client; onBack: () => void }) {
  const [loading, setLoading] = useState(true)
  const [pack, setPack] = useState<PitchPackData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('executive')
  const hasStarted = useRef(false)

  const generate = useCallback(async () => {
    setLoading(true)
    setPack(null)
    setError(null)
    try {
      const result = await fetchPitchPack(client)
      setPack(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate meeting pack')
    }
    setLoading(false)
  }, [client])

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true
      generate()
    }
  }, [generate])

  const handlePrint = () => window.print()

  const tabs = [
    { id: 'executive', label: 'Executive summary' },
    { id: 'insights', label: 'Client insights' },
    { id: 'portfolio', label: 'Portfolio review' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'prep', label: 'Meeting prep' },
    { id: 'appendix', label: 'Appendix' },
  ]

  const quickActions = [
    { icon: StickyNote, label: 'Add note' },
    { icon: ClipboardList, label: 'Record meeting outcome' },
    { icon: CalendarCheck, label: 'Schedule follow-up' },
    { icon: FileText, label: 'Create proposal' },
  ]

  return (
    <div className="mp-page">
      {/* A. Header & Top Action Bar */}
      <div className="mp-topbar">
        <div className="mp-topbar-left">
          <button type="button" className="mp-back-link" onClick={onBack}>
            <ChevronLeft size={16} />
            Back to Command Centre
          </button>
          <div className="mp-title-row">
            <h1>Meeting Pack</h1>
            <Sparkles size={20} color="#E11414" />
          </div>
          <p className="mp-subtitle">Prepared for your meeting with {client.name}</p>
          <span className="mp-ai-badge">
            <Sparkles size={11} />
            AI generated
          </span>
        </div>
        <div className="mp-topbar-actions">
          <button type="button" className="mp-action-btn mp-action-ghost" onClick={handlePrint}>
            <Share2 size={15} />
            Share pack
          </button>
          <button type="button" className="mp-action-btn mp-action-ghost" onClick={handlePrint}>
            <Download size={15} />
            Export
          </button>
          <button type="button" className="mp-action-btn mp-action-primary">
            <Play size={15} />
            Start meeting
          </button>
        </div>
      </div>

      {/* B. Client Summary Header — 5 Metric Cards */}
      <div className="mp-metrics-bar">
        <div className="mp-metric-card">
          <div className="mp-metric-profile">
            <ClientAvatar client={client} size="sm" />
            <div>
              <strong>{client.name}</strong>
              <div className="mp-metric-badges">
                {client.segmentBadges.slice(0, 2).map((b) => (
                  <span key={b} className="mp-tag">{b}</span>
                ))}
              </div>
              <span className="mp-metric-since">Customer since: Aug 2018</span>
            </div>
          </div>
        </div>
        <div className="mp-metric-card">
          <label className="mp-metric-label">Relationship Overview</label>
          <strong className="mp-metric-value">{client.relationshipValue}</strong>
          <span className="mp-metric-delta positive">+8.6% vs last review</span>
        </div>
        <div className="mp-metric-card">
          <label className="mp-metric-label">Engagement Health</label>
          <span className="mp-health-badge healthy">Healthy</span>
          <span className="mp-metric-sub">Last interaction 3 weeks ago</span>
        </div>
        <div className="mp-metric-card">
          <label className="mp-metric-label">Next Key Milestone</label>
          <div className="mp-milestone-row">
            <span className="mp-milestone-badge">
              <FileCheck size={12} />
              {client.nextMilestone.label}
            </span>
            <span className="mp-milestone-due">Due {client.nextMilestone.dueDate} ({client.nextMilestone.daysLeft} days)</span>
          </div>
        </div>
        <div className="mp-metric-card">
          <label className="mp-metric-label">Agenda Preview</label>
          <ul className="mp-agenda-preview">
            {client.whyNow.slice(0, 3).map((item, i) => (
              <li key={i}>{item.length > 35 ? item.slice(0, 35) + '…' : item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* C. Section Navigation Tabs */}
      <div className="mp-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`mp-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mp-loading">
          <div className="loading-spinner" />
          <p>Generating comprehensive meeting pack via AI…</p>
          <div className="mp-skeleton-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="mp-skeleton-card">
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mp-error">
          <AlertCircle size={40} color="#E11414" />
          <p>{error}</p>
          <button type="button" className="mp-retry-btn" onClick={() => generate()}>
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      )}

      {/* D. Main Workspace — 2-Column Grid */}
      {pack && !loading && !error && (
        <div className="mp-workspace">
          {/* LEFT COLUMN */}
          <div className="mp-main-col">
            {/* Executive Summary Box */}
            <div className="mp-section-card mp-exec-summary">
              <h3 className="mp-section-title">
                <Sparkles size={18} color="#E11414" />
                Executive Summary
              </h3>
              <p className="mp-exec-text">{pack.executiveSummary}</p>
            </div>

            {/* 3-Column Grid Block */}
            <div className="mp-triple-grid">
              {/* Key Priorities */}
              <div className="mp-mini-card">
                <h4 className="mp-mini-title">
                  <Target size={16} color="#E11414" />
                  Key Priorities
                </h4>
                <ul className="mp-mini-bullets red">
                  {pack.keyPriorities.slice(0, 3).map((item, i) => (
                    <li key={i}>
                      <span className="mp-bullet-dot red" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Recent Highlights */}
              <div className="mp-mini-card">
                <h4 className="mp-mini-title">
                  <CheckCircle2 size={16} color="#10B981" />
                  Recent Highlights
                </h4>
                <ul className="mp-mini-bullets green">
                  {pack.recentHighlights.slice(0, 3).map((item, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} color="#10B981" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Opportunities */}
              <div className="mp-mini-card">
                <h4 className="mp-mini-title">
                  <Lightbulb size={16} color="#F59E0B" />
                  Opportunities
                </h4>
                <ul className="mp-mini-bullets yellow">
                  {pack.opportunities.slice(0, 3).map((item, i) => (
                    <li key={i}>
                      <span className="mp-bullet-dot yellow" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Portfolio Snapshot Section */}
            <div className="mp-section-card">
              <div className="mp-port-header">
                <h3 className="mp-section-title">
                  <BarChart3 size={18} color="#E11414" />
                  Portfolio snapshot
                </h3>
                <span className="mp-port-date">as at 15 Oct 2026</span>
              </div>

              {/* Stat Callouts */}
              <div className="mp-port-stats">
                <div className="mp-port-stat">
                  <label>Total portfolio value</label>
                  <div className="mp-port-stat-val">
                    <strong>{pack.portfolioSnapshot.totalValue || client.relationshipValue}</strong>
                    <span className="mp-port-delta">({pack.portfolioSnapshot.ytdReturn || '+8.6%'})</span>
                  </div>
                </div>
                <div className="mp-port-stat">
                  <label>Overall return (YTD)</label>
                  <div className="mp-port-stat-val">
                    <strong>{pack.portfolioSnapshot.ytdReturn || '+7.8%'}</strong>
                  </div>
                </div>
              </div>

              {/* Asset Allocation Donut Chart */}
              <div className="mp-alloc-section">
                <div className="mp-donut-wrap">
                  <svg width="160" height="160" viewBox="0 0 160 160" className="mp-donut">
                    {(() => {
                      const eq = pack.portfolioSnapshot.equitiesPercent
                      const fi = pack.portfolioSnapshot.fixedIncomePercent
                      const ca = pack.portfolioSnapshot.cashPercent
                      const al = pack.portfolioSnapshot.alternativesPercent || (100 - eq - fi - ca)
                      const C = 2 * Math.PI * 60
                      return (
                        <>
                          <circle cx="80" cy="80" r="60" fill="none" stroke="#6366F1" strokeWidth="20"
                            strokeDasharray={`${(eq / 100) * C} ${C}`} strokeDashoffset="0" transform="rotate(-90 80 80)" />
                          <circle cx="80" cy="80" r="60" fill="none" stroke="#10B981" strokeWidth="20"
                            strokeDasharray={`${(fi / 100) * C} ${C}`} strokeDashoffset={`${-(eq / 100) * C}`} transform="rotate(-90 80 80)" />
                          <circle cx="80" cy="80" r="60" fill="none" stroke="#F59E0B" strokeWidth="20"
                            strokeDasharray={`${(ca / 100) * C} ${C}`} strokeDashoffset={`${-((eq + fi) / 100) * C}`} transform="rotate(-90 80 80)" />
                          <circle cx="80" cy="80" r="60" fill="none" stroke="#EC4899" strokeWidth="20"
                            strokeDasharray={`${(al / 100) * C} ${C}`} strokeDashoffset={`${-((eq + fi + ca) / 100) * C}`} transform="rotate(-90 80 80)" />
                        </>
                      )
                    })()}
                    <text x="80" y="76" textAnchor="middle" className="mp-donut-center-val">
                      {pack.portfolioSnapshot.totalValue || client.relationshipValue}
                    </text>
                    <text x="80" y="92" textAnchor="middle" className="mp-donut-center-label">
                      Total Value
                    </text>
                  </svg>
                </div>
                <div className="mp-alloc-legend">
                  <div className="mp-legend-item">
                    <span className="mp-legend-dot" style={{ background: '#6366F1' }} />
                    <span className="mp-legend-label">Equities</span>
                    <strong>{pack.portfolioSnapshot.equitiesPercent}%</strong>
                  </div>
                  <div className="mp-legend-item">
                    <span className="mp-legend-dot" style={{ background: '#10B981' }} />
                    <span className="mp-legend-label">Fixed Income</span>
                    <strong>{pack.portfolioSnapshot.fixedIncomePercent}%</strong>
                  </div>
                  <div className="mp-legend-item">
                    <span className="mp-legend-dot" style={{ background: '#F59E0B' }} />
                    <span className="mp-legend-label">Cash</span>
                    <strong>{pack.portfolioSnapshot.cashPercent}%</strong>
                  </div>
                  <div className="mp-legend-item">
                    <span className="mp-legend-dot" style={{ background: '#EC4899' }} />
                    <span className="mp-legend-label">Alternatives</span>
                    <strong>{pack.portfolioSnapshot.alternativesPercent || (100 - pack.portfolioSnapshot.equitiesPercent - pack.portfolioSnapshot.fixedIncomePercent - pack.portfolioSnapshot.cashPercent)}%</strong>
                  </div>
                </div>
              </div>
              <p className="mp-alloc-notes">{pack.portfolioSnapshot.notes}</p>

              {/* Risk Profile Gauge */}
              <div className="mp-risk-section">
                <label className="mp-risk-label">Risk Profile</label>
                <div className="mp-risk-gauge">
                  <div className="mp-risk-track">
                    <div className="mp-risk-segment conservative">Conservative</div>
                    <div className="mp-risk-segment moderate">Moderate</div>
                    <div className="mp-risk-segment aggressive">Aggressive</div>
                  </div>
                  <div className={`mp-risk-pointer ${pack.riskProfile?.toLowerCase() || 'moderate'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="mp-side-col">
            {/* Agenda for Meeting Card */}
            <div className="mp-side-card">
              <h3 className="mp-side-title">
                <Timer size={18} color="#E11414" />
                Agenda for Meeting
              </h3>
              <div className="mp-agenda-list">
                {pack.agenda.map((item, i) => (
                  <div key={i} className="mp-agenda-item">
                    <span className="mp-agenda-num">{i + 1}</span>
                    <div className="mp-agenda-content">
                      <span className="mp-agenda-time">{item.time}</span>
                      <span className="mp-agenda-topic">{item.topic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Questions Card */}
            <div className="mp-side-card">
              <h3 className="mp-side-title">
                <MessageSquare size={18} color="#E11414" />
                Suggested Questions
              </h3>
              <ul className="mp-questions-list">
                {pack.suggestedQuestions.map((q, i) => (
                  <li key={i}>
                    <span className="mp-q-marker">Q{i + 1}</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions List */}
            <div className="mp-side-card">
              <h3 className="mp-side-title">
                <Zap size={18} color="#E11414" />
                Quick Actions
              </h3>
              <div className="mp-quick-actions">
                {quickActions.map((action, i) => {
                  const ActionIcon = action.icon
                  return (
                    <button key={i} type="button" className="mp-quick-action-btn">
                      <span className="mp-qa-left">
                        <ActionIcon size={16} color="#6B7280" />
                        {action.label}
                      </span>
                      <ArrowRight size={15} color="#9CA3AF" />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Footer Disclaimer */}
      {pack && !loading && !error && (
        <div className="mp-ai-footer">
          <Sparkles size={14} color="#9CA3AF" />
          <p>
            Prepared by AI Command — This meeting pack was prepared based on the latest data available
            from CRM, core banking, and market data sources. Please review all recommendations
            before discussing with the client.
          </p>
        </div>
      )}

      {/* Regenerate Floating Button */}
      {pack && !loading && !error && (
        <div className="mp-regen-bar">
          <button type="button" className="mp-regen-btn" onClick={() => generate()}>
            <RefreshCw size={16} />
            Regenerate Meeting Pack
          </button>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   Magic Box — NL filter/sort bar for client list
   ============================================================ */

const magicSuggestions = [
  { label: 'High Excess Cash', icon: Wallet, prompt: 'Show clients with excess cash positions' },
  // { label: 'Upcoming Birthdays', icon: Cake, prompt: 'Rank by upcoming birthdays' },
  { label: 'Market Volatility Alert', icon: TrendingDown, prompt: 'Show clients with market volatility alerts' },
  // { label: 'KYC Refresh Due', icon: FileCheck, prompt: 'Which clients need urgent KYC updates?' },
]

function MagicBox({ onSort, loading }: { onSort: (prompt: string) => void; loading: boolean }) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (!input.trim()) return
    onSort(input.trim())
  }

  const handleChip = (prompt: string) => {
    setInput(prompt)
    onSort(prompt)
  }

  return (
    <div className="magic-box">
      <div className="magic-input-wrap">
        <span className="magic-icon"><Wand2 size={18} color="#E11414" /></span>
        <input
          type="text"
          className="magic-input"
          placeholder="Ask AI to filter or rank (e.g., 'Show clients with >HKD 50M AUM who haven't been contacted in 30 days' or 'Rank by upcoming birthdays')..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          disabled={loading}
        />
        {loading ? (
          <div className="magic-spinner" />
        ) : (
          <button type="button" className="magic-send-btn" onClick={handleSubmit} aria-label="Send prompt" />
        )}
      </div>
      <div className="magic-chips">
        {magicSuggestions.map((chip) => {
          const ChipIcon = chip.icon
          return (
            <button
              key={chip.label}
              type="button"
              className="magic-chip"
              onClick={() => handleChip(chip.prompt)}
              disabled={loading}
            >
              <ChipIcon size={13} />
              {chip.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ============================================================
   Chatbot Widget — Floating AI assistant
   ============================================================ */

const chatStarterPrompts = [
  'Summarize my priority actions for today',
  'Give me talking points for HK tech market dip',
  'Which clients need urgent KYC updates?',
]

function ChatbotWidget({ clients }: { clients: Client[] }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: ChatMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await fetchChatResponse(newMessages, clients)
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    }
    setLoading(false)
  }

  const handleClear = () => {
    setMessages([])
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        className={`chat-fab ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
      >
        <Bot size={26} color="#FFFFFF" />
        <span className="chat-fab-pulse" />
      </button>

      {/* Chat Popover */}
      {open && (
        <div className="chat-popover">
          <button
            type="button"
            className="chat-popover-close"
            onClick={() => setOpen(false)}
            title="Close chat"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-bot-avatar">
                <Bot size={18} color="#FFFFFF" />
              </div>
              <div>
                <strong>DBS AI Assistant</strong>
                <span className="chat-status">
                  <span className="chat-status-dot" /> Active
                </span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button type="button" className="chat-icon-btn" onClick={handleClear} title="Clear chat">
                <Trash2 size={16} />
              </button>
              <button type="button" className="chat-icon-btn" onClick={() => setOpen(false)} title="Minimize">
                <Minus size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="chat-body" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-icon">
                  <MessageSquare size={32} color="#E11414" />
                </div>
                <p className="chat-welcome-title">How can I help you today?</p>
                <p className="chat-welcome-sub">Ask me about your clients, market insights, or next steps.</p>
                <div className="chat-starters">
                  {chatStarterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="chat-starter-chip"
                      onClick={() => sendMessage(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="chat-msg-bubble">
                  {msg.content.split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg assistant">
                <div className="chat-msg-bubble chat-typing">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="chat-input-bar">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(input)
              }}
              disabled={loading}
            />
            <button
              type="button"
              className="chat-send-btn"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}



type View = 'command' | 'nextBestAction' | 'meetingPack'

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(clients[0].id)
  const [view, setView] = useState<View>('command')

  // ── Ref to the scrollable content-area (overflow-y: auto) ──
  const contentAreaRef = useRef<HTMLDivElement>(null)

  // ── Magic Box state ──
  const [magicLoading, setMagicLoading] = useState(false)
  const [magicResult, setMagicResult] = useState<MagicResult | null>(null)

  const selectedClient = clients.find((c) => c.id === selectedId) ?? null

  // ── Magic Box handler: AI filter/sort ──
  const handleMagicSort = useCallback(async (prompt: string) => {
    setMagicLoading(true)
    setMagicResult(null)
    try {
      const result = await fetchMagicSort(prompt, clients)
      setMagicResult(result)
    } catch {
      setMagicResult({
        sortedIds: clients.map((c) => ({ customerId: c.id, matchReason: c.trigger })),
        aiSummary: 'Showing default priority order (AI unavailable).',
      })
    }
    setMagicLoading(false)
  }, [])

  // ── Reset magic filter ──
  const handleResetMagic = () => {
    setMagicResult(null)
  }

  // ── FIX 1: State sync — selecting a row updates selectedId immediately ──
  const handleSelectClient = (id: string) => {
    setSelectedId(id)
  }

  // ── FIX 1b: "View reason & outreach" button updates state AND navigates ──
  const handleViewReason = (id: string) => {
    setSelectedId(id)
    setView('nextBestAction')
    setScrollToTimeline(true)
  }

  // ── "Start Outreach" navigates to Next Best Action (scroll to top) ──
  const handleStartOutreach = () => {
    if (!selectedClient) return
    setScrollToTimeline(false)
    setView('nextBestAction')
  }

  // ── Scroll anchor: auto-scroll to Trigger Timeline section on NBA view entry ──
  const [scrollToTimeline, setScrollToTimeline] = useState(false)

  // ── Default page load: scroll to top on every view change ──
  // Skips when scrollToTimeline flag is set (reserved for "View reason & outreach")
  useEffect(() => {
    if (view === 'nextBestAction' && scrollToTimeline) {
      const timer = setTimeout(() => {
        const el = document.getElementById('trigger-timeline-section')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setScrollToTimeline(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Scroll the content-area container (not window) to top
      if (contentAreaRef.current) {
        contentAreaRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      }
      // Fallback: also scroll window in case layout changes
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [view, scrollToTimeline])

  // ── "Generate Meeting Pack" navigates to dedicated page ──
  const handleGenerateMeetingPack = () => {
    if (!selectedClient) return
    setView('meetingPack')
  }

  const handleBack = () => {
    setView('command')
  }

  const handleBackToProfile = () => {
    setScrollToTimeline(false)
    setView('nextBestAction')
  }

  const triggerColors: Record<string, string> = {
    birthday: '#E11414',
    cash: '#6366F1',
    portfolio: '#10B981',
    travel: '#F59E0B',
    kyc: '#8B5CF6',
    market: '#EC4899',
    anniversary: '#14B8A6',
    compliance: '#0EA5E9',
  }

  const triggerIcons: Record<string, LucideIcon> = {
    birthday: Cake,
    cash: Wallet,
    portfolio: PieChart,
    travel: Plane,
    kyc: FileCheck,
    market: Activity,
    anniversary: CalendarCheck,
    compliance: ShieldCheck,
  }

  const sourceColors: Record<string, string> = {
    'Core Banking': '#6366F1',
    'CRM': '#10B981',
    'KYC System': '#8B5CF6',
    'Market Data': '#F59E0B',
  }

  const altActionIcons: Record<string, LucideIcon> = {
    mail: Mail,
    webinar: Video,
    report: FileText,
  }

  const sourceIcons: Record<string, LucideIcon> = {
    'Core Banking': DollarSign,
    'CRM': Users,
    'KYC System': ShieldCheck,
    'Market Data': TrendingUp,
  }

  return (
    <main className="dbs-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="dbs-brand">
            <DBSLogo />
          </div>

          <nav className="nav-group" aria-label="Sidebar navigation">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = index === 0 ? view === 'command' : false
              return (
                <button
                  type="button"
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  key={item.label}
                  onClick={() => {
                    if (index === 0) {
                      setView('command')
                      setSelectedId(clients[0].id)
                    }
                  }}
                >
                  <span className="nav-icon"><Icon size={18} /></span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="help-card">
            <p className="help-title">Need help?</p>
            <p className="help-body">Ask me anything.</p>
            <button type="button" className="help-button">Chat with Command</button>
          </div>

          <div className="rm-profile-card">
            <div className="rm-profile-avatar">
              <User size={18} color="#FFFFFF" />
            </div>
            <div className="rm-profile-info">
              <strong>Heilo Tan</strong>
              <span>Relationship Manager</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Panel ── */}
      <section className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            {view === 'meetingPack' ? (
              <button type="button" className="back-btn" onClick={handleBack}>
                <ArrowLeft size={16} />
                Back to Command Centre
              </button>
            ) : view === 'nextBestAction' ? (
              <button type="button" className="back-btn" onClick={handleBack}>
                <ArrowLeft size={16} />
                Back to Command Centre
              </button>
            ) : (
              <h2 className="topbar-title">RM Command Centre</h2>
            )}
          </div>
          <div className="topbar-tools">
            <div className="search-box">
              <Search size={16} />
              <span>Search customers, tasks, insights…</span>
            </div>
            <button type="button" className="topbar-bell" aria-label="Notifications">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <div className="content-area" ref={contentAreaRef}>
          {/* ═══════════════════════════════════════════════════
              COMMAND CENTRE VIEW
              ═══════════════════════════════════════════════════ */}
          {view === 'command' && (
            <>
            {/* ═══ Section 1: Daily Briefing Workspace (2-Column Grid) ═══ */}
            <div className="briefing-wrapper">
              <div className="briefing-main">

              {/* ── A. Hero Banner & Mascot ── */}
              <section className="hero-banner">
                <div className="hero-text">
                  <h1 className="hero-greeting">Good afternoon, Judges 👋</h1>
                  <p className="hero-subtitle">
                    I'm Command, your daily virtual assistant. Here's what's happening today.
                  </p>
                </div>
                <div className="hero-mascot-card">
                  <img
                    src="/watermarked_img_14509186761565305373.png"
                    alt="Command Robot Mascot"
                    className="hero-mascot-img"
                  />
                </div>
              </section>

              {/* ── B. Top Metric Stat Cards (4 columns) ── */}
              <section className="dashboard-stats-grid">
                {dashboardStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="dash-stat-card">
                      <div className="dash-stat-top">
                        <span className="dash-stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                          <Icon size={18} />
                        </span>
                        <div className="dash-stat-label">{stat.label}</div>
                      </div>
                      <div className="dash-stat-value">{stat.value}</div>
                      <div className="dash-stat-sub">{stat.sub}</div>
                    </div>
                  )
                })}
              </section>

              {/* ── C. Top Suggestions ── */}
              <section className="suggestions-section">
                <h2 className="suggestions-title">
                  <Sparkles size={18} color="#E11414" />
                  Here are my top suggestions for you
                </h2>
                <div className="suggestions-grid">
                  {topSuggestions.map((sug, i) => {
                    const Icon = sug.icon
                    return (
                      <div key={i} className="suggestion-card">
                        <div className="suggestion-left">
                          <span className="suggestion-icon">
                            <Icon size={20} color="#E11414" />
                          </span>
                          <div className="suggestion-content">
                            <h3 className="suggestion-title">{sug.title}</h3>
                            <p className="suggestion-desc">{sug.desc}</p>
                          </div>
                        </div>
                        <button type="button" className="suggestion-btn">
                          {sug.button}
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    )
                  })}
                </div>
                <button type="button" className="suggestions-footer-link">
                  View all suggestions
                  <ChevronRight size={14} />
                </button>
              </section>

              {/* ── D. Main AI Command Prompt Bar ──
              <section className="command-prompt-section">
                <div className="command-prompt-bar">
                  <Search size={18} color="#9CA3AF" />
                  <input
                    type="text"
                    className="command-prompt-input"
                    placeholder="Ask Command anything..."
                  />
                  <button type="button" className="command-prompt-mic" aria-label="Voice input">
                    <MessageSquare size={18} />
                  </button>
                  <button type="button" className="command-prompt-send" aria-label="Send">
                    <Send size={18} />
                  </button>
                </div>
                <div className="command-presets">
                  {commandPresets.map((preset) => (
                    <button key={preset} type="button" className="command-preset-chip">
                      {preset}
                    </button>
                  ))}
                </div>
              </section> */}

              </div>{/* /briefing-main */}

              {/* ── Right Sidebar Widgets (NO sticky/fixed) ── */}
              <aside className="dashboard-sidebar">
                {/* 1. Today's Schedule */}
                <div className="sidebar-widget">
                  <div className="widget-header">
                    <h3 className="widget-title">
                      <Calendar size={16} color="#E11414" />
                      Today's Schedule
                    </h3>
                    <button type="button" className="widget-link">View Calendar</button>
                  </div>
                  <div className="schedule-timeline">
                    {todaySchedule.map((item, i) => (
                      <div key={i} className="schedule-item">
                        <div className="schedule-time">{item.time}</div>
                        <div className="schedule-content">
                          <div className="schedule-dot" style={{ background: item.tagColor }} />
                          <div className="schedule-body">
                            <strong className="schedule-name">{item.title}</strong>
                            <span className="schedule-tag" style={{ background: `${item.tagColor}15`, color: item.tagColor }}>
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="schedule-more">
                      +2 more meetings
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* 2. Important Reminders */}
                <div className="sidebar-widget">
                  <div className="widget-header">
                    <h3 className="widget-title">
                      <Bell size={16} color="#E11414" />
                      Important Reminders
                    </h3>
                  </div>
                  <ul className="reminders-list">
                    {reminders.map((r, i) => {
                      const Icon = r.icon
                      return (
                        <li key={i} className="reminder-item">
                          <span className="reminder-dot" />
                          <div className="reminder-body">
                            <div className="reminder-text">
                              <Icon size={14} color="#6B7280" />
                              {r.text}
                            </div>
                            <span className="reminder-due">{r.due}</span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <button type="button" className="widget-link widget-link-block">
                    View all reminders
                    <ChevronRight size={13} />
                  </button>
                </div>

                {/* 3. Command's Tip of the Day
                <div className="sidebar-widget tip-widget">
                  <div className="tip-icon-wrap">
                    <Lightbulb size={22} color="#E11414" />
                  </div>
                  <h3 className="tip-title">Command's Tip of the Day</h3>
                  <p className="tip-text">
                    Use the Customer 360 view before meetings to personalise your conversations and build stronger relationships.
                  </p>
                  <button type="button" className="tip-learn-more">
                    Learn more
                    <ArrowRight size={13} />
                  </button>
                </div> */}
              </aside>
            </div>{/* /briefing-wrapper */}

            {/* ═══ Section 2: Customer Priority Workspace (Full Width) ═══ */}
            <div className="priority-section">
              <div className="page-header">
                <h1>Customers to Reach Today</h1>
                <p>AI-ranked priority list with engagement signals and recommended next steps.</p>
              </div>

              {/* KPI Cards with lucide icons */}
              <section className="kpi-grid">
                {kpiCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div key={card.label} className={`kpi-card kpi-${card.color}`}>
                      <div className="kpi-icon-row">
                        <span className={`kpi-icon kpi-icon-${card.color}`}>
                          <Icon size={18} />
                        </span>
                        <p className="kpi-label">{card.label}</p>
                      </div>
                      <div className="kpi-value-row">
                        <span className="kpi-value">{card.value}</span>
                        <span className="kpi-sub">{card.sub}</span>
                      </div>
                    </div>
                  )
                })}
              </section>

              {/* Customer View — 2-Column Sub-Layout */}
              <section className="command-grid">
                {/* Left: AI-Recommended Reach Order */}
                <div className="reach-panel">
                  <div className="panel-header">
                    <h2>AI-Recommended Reach Order</h2>
                    <span className="panel-count">
                      {magicResult ? `${magicResult.sortedIds.length} results` : `${clients.length} clients`}
                    </span>
                  </div>

                  {/* Magic Box — NL filter/sort bar */}
                  <MagicBox onSort={handleMagicSort} loading={magicLoading} />

                  {/* AI Summary badge */}
                  {magicResult && magicResult.aiSummary && (
                    <div className="magic-summary-bar">
                      <Sparkles size={14} color="#E11414" />
                      <span>{magicResult.aiSummary}</span>
                      <button type="button" className="magic-reset-btn" onClick={handleResetMagic}>
                        <X size={14} /> Reset
                      </button>
                    </div>
                  )}

                  <div className={`client-list ${magicLoading ? 'magic-loading' : ''}`}>
                    {magicLoading ? (
                      [...Array(4)].map((_, i) => (
                        <div key={i} className="client-card-row shimmer-row">
                          <div className="shimmer-avatar" />
                          <div className="shimmer-lines">
                            <div className="skeleton-line" />
                            <div className="skeleton-line short" />
                          </div>
                        </div>
                      ))
                    ) : (
                      (magicResult
                        ? magicResult.sortedIds
                            .map((m) => {
                              const c = clients.find((cl) => cl.id === m.customerId)
                              return c ? { ...c, matchReason: m.matchReason } : null
                            })
                            .filter((c): c is Client & { matchReason: string } => c !== null)
                        : clients
                      ).map((client, idx) => {
                        const matchReason = (client as Client & { matchReason?: string }).matchReason
                        return (
                          <div
                            key={client.id}
                            className={`client-card-row ${selectedId === client.id ? 'selected' : ''}`}
                            onClick={() => handleSelectClient(client.id)}
                          >
                            <div className="rank-badge">{magicResult ? idx + 1 : client.rank}</div>
                            <ClientAvatar client={client} size="sm" />
                            <div className="client-info">
                              <div className="client-name-line">
                                <h3>{client.name}</h3>
                                <span className="segment-tag">{client.segment}</span>
                              </div>
                              <div className="client-meta-line">
                                <span className="meta-value">{client.relationshipValue}</span>
                                <span className="meta-dot" />
                                <span className="meta-trigger" style={{ color: triggerColors[client.triggerType] }}>
                                  {(() => {
                                    const TriggerIcon = triggerIcons[client.triggerType] ?? AlertCircle
                                    return <TriggerIcon size={13} style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 4 }} />
                                  })()}
                                  {client.trigger}
                                </span>
                              </div>
                              {matchReason && (
                                <div className="magic-match-badge">
                                  <Wand2 size={11} />
                                  {matchReason}
                                </div>
                              )}
                            </div>
                            <div className="client-score-col">
                              <div className="score-bar-wrap">
                                <div
                                  className="score-bar-fill"
                                  style={{ width: `${client.engagementScore}%`, background: client.engagementScore >= 80 ? '#10B981' : client.engagementScore >= 70 ? '#F59E0B' : '#E11414' }}
                                />
                              </div>
                              <span className="score-pct">{client.engagementScore}%</span>
                            </div>
                            <button
                              type="button"
                              className="view-reason-btn"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewReason(client.id)
                              }}
                            >
                              View reason &amp; outreach
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Right: Detail Drawer */}
                <div className="detail-drawer-wrapper">
                  {selectedClient ? (
                    <div className="detail-drawer">
                      <div className="detail-header">
                        <ClientAvatar client={selectedClient} size="lg" />
                        <div className="detail-header-info">
                          <h2>{selectedClient.name}</h2>
                          <div className="detail-meta-row">
                            <span>{selectedClient.segment}</span>
                            <span className="meta-dot" />
                            <span>AUM {selectedClient.relationshipValue}</span>
                            <span className="meta-dot" />
                            <span>Rank #{selectedClient.rank}</span>
                          </div>
                          <div className="detail-trigger-row">
                            {(() => {
                              const TriggerIcon = triggerIcons[selectedClient.triggerType] ?? AlertCircle
                              return <TriggerIcon size={14} style={{ color: triggerColors[selectedClient.triggerType] }} />
                            })()}
                            <span style={{ color: triggerColors[selectedClient.triggerType], fontWeight: 600, fontSize: '13px' }}>
                              {selectedClient.trigger}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="detail-body">
                        <div className="detail-section">
                          <h3 className="detail-section-title">
                            <Clock size={16} color="#E11414" />
                            Why reach out now?
                          </h3>
                          <ul className="detail-bullets">
                            {selectedClient.whyNow.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="detail-section">
                          <h3 className="detail-section-title">
                            <Zap size={16} color="#E11414" />
                            Suggested Purpose
                          </h3>
                          <p className="detail-text">{selectedClient.suggestedPurpose}</p>
                        </div>

                        <div className="detail-section">
                          <h3 className="detail-section-title">
                            <Calendar size={16} color="#E11414" />
                            Best Time to Reach
                          </h3>
                          <div className="time-block">
                            <strong>{selectedClient.bestTime}</strong>
                            <span>{selectedClient.bestTimeNote}</span>
                          </div>
                        </div>

                        <div className="detail-section">
                          <h3 className="detail-section-title">
                            <ArrowRight size={16} color="#E11414" />
                            Recommended Next Step
                          </h3>
                          <p className="detail-text">{selectedClient.nextStep}</p>
                        </div>
                      </div>

                      <div className="detail-footer">
                        <button
                          type="button"
                          className="primary-action-btn"
                          onClick={handleStartOutreach}
                        >
                          Start Outreach
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="detail-empty-state">
                      <div className="empty-icon">
                        <Users size={48} color="#D1D5DB" />
                      </div>
                      <p className="empty-title">Select a client</p>
                      <p className="empty-sub">Choose a client from the list to view AI insights and recommended next steps.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>{/* /priority-section */}
            </>
          )}

          {/* ═══════════════════════════════════════════════════
              NEXT BEST ACTION VIEW
              ═══════════════════════════════════════════════════ */}
          {view === 'nextBestAction' && selectedClient && (
            <div className="nba-view">
              {/* ═══ 1. Header Bar & Client Metrics ═══ */}
              <div className="nba-header-banner">
                <div className="nba-header-left">
                  <ClientAvatar client={selectedClient} size="lg" />
                  <div className="nba-header-info">
                    <h1>{selectedClient.name}</h1>
                    <div className="nba-badges">
                      {selectedClient.segmentBadges.map((badge) => (
                        <span key={badge} className={`nba-badge ${badge.includes('High') ? 'high' : badge.includes('Medium') ? 'medium' : 'low'}`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                    {/* Sub-Metadata Row */}
                    <div className="nba-meta-row">
                      <span><Calendar size={11} /> Relationship since: 2018</span>
                      <span><Users size={11} /> Segment: {selectedClient.segment}</span>
                      <span><DollarSign size={11} /> Total Asset: {selectedClient.relationshipValue}</span>
                      <span><User size={11} /> Primary Banker: Jonathan Lee</span>
                    </div>
                  </div>
                </div>

                {/* Top Metric Callouts + View 360 Button */}
                <div className="nba-header-right">
                  <div className="nba-kpi-row">
                    <div className="nba-kpi">
                      <label>Total Relationship Value</label>
                      <strong>{selectedClient.relationshipValue}</strong>
                      <span className="nba-kpi-badge">High Value</span>
                    </div>
                    <div className="nba-kpi">
                      <label>Investable Assets</label>
                      <strong>{selectedClient.investableAssets}</strong>
                    </div>
                    <div className="nba-kpi">
                      <label>Household AUM</label>
                      <strong>{selectedClient.householdAum}</strong>
                    </div>
                  </div>
                  <button type="button" className="nba-view-360-btn">
                    <ShieldCheck size={15} />
                    View Client 360
                  </button>
                </div>
              </div>

              {/* ═══ 2-4. Three-Column Grid ═══ */}
              <div className="nba-grid">
                {/* ═══ 2. Left Column — AI Recommendation ═══ */}
                <div className="nba-col">
                  {/* AI Recommendation Card */}
                  <div className="nba-card nba-ai-card">
                    <span className="nba-ai-tag">
                      <Sparkles size={11} />
                      AI RECOMMENDATION
                    </span>
                    <h2 className="nba-ai-headline">{selectedClient.suggestedPurpose}</h2>
                    <p className="nba-ai-summary">
                      Engage {selectedClient.name.split(' ')[0]} proactively to address key risks and capture potential opportunities.
                    </p>

                    {/* Priority Score Gauge */}
                    <div className="nba-priority-gauge">
                      <div className="gauge-ring">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#F4F5F7" strokeWidth="8" />
                          <circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke={selectedClient.priorityScore >= 80 ? '#E11414' : '#F59E0B'}
                            strokeWidth="8"
                            strokeDasharray={`${(selectedClient.priorityScore / 100) * 264} 264`}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="gauge-value">
                          <span>{selectedClient.priorityScore}</span>
                          <small>Priority Score</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why Now Section */}
                  <div className="nba-card">
                    <h3 className="nba-card-title">
                      <AlertCircle size={18} color="#E11414" />
                      Why Now
                    </h3>
                    <ul className="nba-why-list">
                      {selectedClient.whyNow.map((item, i) => (
                        <li key={i}>
                          <span className="nba-why-icon"><AlertCircle size={14} color="#E11414" /></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Potential Impact Card */}
                  <div className="nba-card nba-impact-card">
                    <h3 className="nba-card-title">
                      <TrendingUp size={18} color="#E11414" />
                      Potential Impact
                    </h3>
                    <div className="nba-impact-badge-row">
                      <span className="nba-impact-badge">High Impact</span>
                    </div>
                    <p className="nba-text">{selectedClient.potentialImpact}</p>
                  </div>
                </div>

                {/* ═══ 3. Middle Column — Rationale & Source Facts ═══ */}
                <div className="nba-col" id="trigger-timeline-section">
                  {/* Sub-Navigation Tabs */}
                  {/* <div className="nba-sub-tabs">
                    <button type="button" className="nba-sub-tab active">Rationale</button>
                    <button type="button" className="nba-sub-tab">Client Snapshot</button>
                  </div> */}

                  {/* Timelined Rationale Feed */}
                  <div className="nba-card">
                    <h3 className="nba-card-title">
                      <Clock size={18} color="#E11414" />
                      Rationale
                    </h3>
                    <div className="timeline">
                      {selectedClient.timeline.map((entry, i) => {
                        const SourceIcon = sourceIcons[entry.source] ?? Clock
                        return (
                          <div key={i} className="timeline-item">
                            <div className="timeline-dot" style={{ background: sourceColors[entry.source] ?? '#6B7280' }}>
                              <SourceIcon size={10} color="#FFFFFF" />
                            </div>
                            <div className="timeline-content">
                              <span className="timeline-date">{entry.date}</span>
                              <p className="timeline-event">{entry.event}</p>
                              <span className="timeline-source" style={{ color: sourceColors[entry.source] ?? '#6B7280' }}>
                                {entry.source}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Source Facts Grid */}
                  <div className="nba-card">
                    <h3 className="nba-card-title">
                      <ShieldCheck size={18} color="#E11414" />
                      Source Facts
                    </h3>
                    <div className="source-badges">
                      {Object.entries(sourceColors).map(([source, color]) => {
                        const SourceIcon = sourceIcons[source] ?? FileText
                        return (
                          <span key={source} className="source-badge" style={{ borderColor: color, color }}>
                            <SourceIcon size={12} />
                            {source}
                          </span>
                        )
                      })}
                      {/* Additional source pills from screenshot */}
                      <span className="source-badge" style={{ borderColor: '#8B5CF6', color: '#8B5CF6' }}>
                        <History size={12} /> Call Reports
                      </span>
                      <span className="source-badge" style={{ borderColor: '#0EA5E9', color: '#0EA5E9' }}>
                        <Lightbulb size={12} /> CIO Insights
                      </span>
                      <span className="source-badge" style={{ borderColor: '#6B7280', color: '#6B7280' }}>
                        <Folder size={12} /> Document Vault
                      </span>
                    </div>
                  </div>
                </div>

                {/* ═══ 4. Right Column — Recommended Action & Context ═══ */}
                <div className="nba-col">
                  {/* Recommended Action Card */}
                  <div className="nba-card action-card-primary">
                    <div className="nba-rec-header">
                      <h3 className="nba-card-title">
                        <Zap size={18} color="#E11414" />
                        Recommended Action
                      </h3>
                      <span className="nba-confidence-badge">High</span>
                    </div>
                    <p className="nba-rec-action-title">{selectedClient.suggestedPurpose}</p>
                    <p className="nba-text">{selectedClient.nextStep}</p>
                    <div className="nba-action-buttons">
                      <button type="button" className="nba-btn primary" onClick={handleGenerateMeetingPack}>
                        <Calendar size={16} /> Prepare meeting
                      </button>
                      <button type="button" className="nba-btn secondary">
                        <Phone size={16} /> Contact client
                      </button>
                      <button type="button" className="nba-btn secondary">
                        <ShieldCheck size={16} /> Review rationale
                      </button>
                    </div>
                  </div>

                  {/* Recent Context Feed */}
                  <div className="nba-card">
                    <div className="nba-card-header-row">
                      <h3 className="nba-card-title">
                        <Clock size={18} color="#E11414" />
                        Recent Context
                      </h3>
                      <button type="button" className="nba-view-all-link">View all →</button>
                    </div>
                    <div className="context-feed">
                      {selectedClient.recentContext.map((ctx, i) => {
                        const ChannelIcon = ctx.channel.includes('Phone') ? Phone
                          : ctx.channel.includes('Email') ? Mail
                          : ctx.channel.includes('KYC') ? FileCheck
                          : FileText
                        return (
                          <div key={i} className="context-item">
                            <div className="context-icon-wrap">
                              <ChannelIcon size={14} color="#6B7280" />
                            </div>
                            <div className="context-body">
                              <span className="context-date">{ctx.date}</span>
                              <p className="context-action">{ctx.action}</p>
                              <span className="context-channel">{ctx.channel}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ 5. Bottom Section — Alternative Actions ═══ */}
              <div className="nba-alt-actions">
                <div className="nba-alt-header">
                  <h3 className="nba-section-header">Alternative Actions Considered</h3>
                  <button type="button" className="nba-view-comparison">View comparison →</button>
                </div>
                <div className="alt-actions-grid">
                  {selectedClient.altActions.map((action, i) => {
                    const ActionIcon = altActionIcons[action.icon] ?? Mail
                    const impactLevel = i === 0 ? 'Medium' : i === 1 ? 'Low' : 'Very Low'
                    const impactColor = impactLevel === 'Medium' ? '#F59E0B' : impactLevel === 'Low' ? '#6B7280' : '#9CA3AF'
                    return (
                      <div key={i} className="alt-action-card">
                        <div className="alt-action-top">
                          <div className="alt-action-icon">
                            <ActionIcon size={20} color="#6B7280" />
                          </div>
                          <div>
                            <h4>{action.title}</h4>
                            <p>{action.desc}</p>
                          </div>
                        </div>
                        <div className="alt-action-footer">
                          <span className="alt-impact-label">Impact:</span>
                          <span className="alt-impact-badge" style={{ color: impactColor, borderColor: `${impactColor}40`, background: `${impactColor}10` }}>
                            {impactLevel}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              MEETING PACK PAGE VIEW
              ═══════════════════════════════════════════════════ */}
          {view === 'meetingPack' && selectedClient && (
            <MeetingPackPage client={selectedClient} onBack={handleBackToProfile} />
          )}
        </div>
      </section>

      {/* ── Floating AI Chatbot Widget ── */}
      <ChatbotWidget clients={clients} />
    </main>
  )
}

export default App
