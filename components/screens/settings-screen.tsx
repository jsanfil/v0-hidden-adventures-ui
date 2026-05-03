"use client"

import { ChevronLeft, ChevronRight, MessageSquare, FileText, Shield, Trash2, Bug } from "lucide-react"
import { useState } from "react"

// ─── Sub-screens ────────────────────────────────────────────────────────────

type SubScreen = "main" | "feedback" | "terms" | "privacy" | "delete"

// ── Send Feedback ──────────────────────────────────────────────────────────

const FEEDBACK_CATEGORIES = [
  "Bug Report",
  "Feature Request",
  "Content Issue",
  "Account Problem",
  "Other",
]

function FeedbackScreen({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)

  const handleSubmit = () => {
    if (!message.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setCategory("")
      setMessage("")
      onBack()
    }, 1500)
  }

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="h-14 flex-shrink-0" />
      <div className="px-5 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground mb-5"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Send Feedback</h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          We appreciate hearing from you. Please provide your feedback below or contact{" "}
          <span className="text-accent font-medium">support@hiddenadventures.com</span>
        </p>
      </div>

      <div className="flex-1 px-5 flex flex-col gap-4">
        {/* Category Picker */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryPicker(!showCategoryPicker)}
            className="w-full h-12 rounded-xl border border-border bg-card px-4 flex items-center justify-between text-sm"
          >
            <span className={category ? "text-foreground font-medium" : "text-muted-foreground"}>
              {category || "Category..."}
            </span>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showCategoryPicker ? "rotate-90" : ""}`} />
          </button>
          {showCategoryPicker && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
              {FEEDBACK_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setShowCategoryPicker(false) }}
                  className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-secondary transition-colors border-b border-border last:border-0"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Area */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please enter your feedback."
          className="flex-1 min-h-[160px] rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Submit Button */}
      <div className="px-5 pb-10 pt-4 flex-shrink-0">
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || submitted}
          className="w-full h-14 rounded-xl border border-border bg-card text-foreground font-semibold text-lg transition-all hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitted ? "Submitted!" : "Submit"}
        </button>
      </div>
    </div>
  )
}

// ── Terms of Service ────────────────────────────────────────────────────────

function TermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="h-14 flex-shrink-0" />
      <div className="px-5 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-4"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-2xl font-semibold text-foreground">Terms of Service</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="bg-card rounded-2xl border border-border p-5 space-y-5 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">Hidden Adventures Terms and Conditions</h2>
            <p className="text-xs text-muted-foreground mb-3">Last updated: March 3, 2019</p>
            <p className="text-muted-foreground">
              Please read these Terms and Conditions carefully before using the Hidden Adventures mobile application operated by Lucidios.
            </p>
            <p className="text-muted-foreground mt-2">
              Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who wish to access or use the Service.
            </p>
            <p className="text-muted-foreground mt-2">
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you do not have permission to access the Service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Communications</h3>
            <p className="text-muted-foreground">
              By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications by following the unsubscribe link or instructions provided in any email we send.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Content</h3>
            <p className="text-muted-foreground">
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post on or through the Service.
            </p>
            <p className="text-muted-foreground mt-2">
              You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Accounts</h3>
            <p className="text-muted-foreground">
              When you create an account with us, you guarantee that you are above the age of 13, and that the information you provide us is accurate, complete, and current at all times.
            </p>
            <p className="text-muted-foreground mt-2">
              You are responsible for maintaining the confidentiality of your account and password, including but not limited to restricting access to your computer and/or account.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Intellectual Property</h3>
            <p className="text-muted-foreground">
              The Service and its original content, features and functionality are and will remain the exclusive property of Lucidios and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Termination</h3>
            <p className="text-muted-foreground">
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Governing Law</h3>
            <p className="text-muted-foreground">
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Privacy Policy ──────────────────────────────────────────────────────────

function PrivacyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="h-14 flex-shrink-0" />
      <div className="px-5 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-4"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-2xl font-semibold text-foreground">Privacy Policy</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="bg-card rounded-2xl border border-border p-5 space-y-5 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">Privacy Policy</h2>
            <p className="text-xs text-muted-foreground mb-3">Effective date: March 06, 2019</p>
            <p className="text-muted-foreground">
              Lucidios operates the Hidden Adventures mobile application (hereinafter referred to as the &quot;Service&quot;).
            </p>
            <p className="text-muted-foreground mt-2">
              This page informs you of our policies regarding the collection, use and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
            <p className="text-muted-foreground mt-2">
              We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Definitions</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="font-medium text-foreground">Service</span> — the Hidden Adventures mobile application operated by Lucidios</li>
              <li><span className="font-medium text-foreground">Personal Data</span> — data about a living individual who can be identified from those data</li>
              <li><span className="font-medium text-foreground">Usage Data</span> — data collected automatically from the use of the Service</li>
              <li><span className="font-medium text-foreground">Cookies</span> — small files stored on your device</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Information Collection and Use</h3>
            <p className="text-muted-foreground">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Types of Data Collected</h3>
            <p className="font-medium text-foreground mb-1">Personal Data</p>
            <p className="text-muted-foreground mb-2">
              While using our Service, we may ask you to provide us with certain personally identifiable information that may include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
              <li>Cookies and Usage Data</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Location Data</h3>
            <p className="text-muted-foreground">
              We may use and store information about your location if you give us permission to do so. We use this data to provide features of our Service and to improve and customise our Service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Use of Data</h3>
            <p className="text-muted-foreground">
              Hidden Adventures uses the collected data to provide and maintain the Service, notify you about changes, allow you to participate in interactive features, provide customer support, and monitor usage of the Service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <span className="text-accent font-medium">support@hiddenadventures.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Delete Account ──────────────────────────────────────────────────────────

function DeleteAccountScreen({ onBack }: { onBack: () => void }) {
  const [deleted, setDeleted] = useState(false)

  if (deleted) {
    return (
      <div className="w-full h-full bg-background flex flex-col items-center justify-center px-6 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <Trash2 className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Account Deleted</h2>
        <p className="text-sm text-muted-foreground">Your account has been permanently deleted.</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="h-14 flex-shrink-0" />
      <div className="px-5 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-5"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Delete Account</h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <p className="text-center font-semibold text-accent leading-relaxed text-base">
          This will permanently delete your account and all of your content. You will no longer be able to login. Are you sure?
        </p>
      </div>

      {/* Delete Button */}
      <div className="px-5 pb-10 flex-shrink-0">
        <button
          onClick={() => setDeleted(true)}
          className="w-full h-14 rounded-xl border border-border bg-card text-destructive font-semibold text-lg transition-all hover:bg-destructive/10"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

// ── Debug Logs ──────────────────────────────────────────────────────────────

function DebugLogsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="mx-6 bg-card rounded-2xl shadow-xl overflow-hidden">
        <div className="px-5 pt-5 pb-4">
          <h3 className="text-base font-semibold text-foreground mb-2">Debug Logs Submitted</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your debug logs were sent to customer support. Please tap the &quot;Contact Support&quot; button and provide the details of your issue.
          </p>
        </div>
        <div className="border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-3.5 text-sm font-semibold text-primary hover:bg-secondary transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Settings Menu ──────────────────────────────────────────────────────

const MENU_ITEMS = [
  { id: "feedback", label: "Give us feedback", icon: MessageSquare },
  { id: "terms", label: "Terms of Service", icon: FileText },
  { id: "privacy", label: "Privacy Policy", icon: Shield },
  { id: "delete", label: "Delete Account", icon: Trash2, destructive: true },
  { id: "debug", label: "Upload Debug Logs", icon: Bug },
] as const

type MenuId = typeof MENU_ITEMS[number]["id"]

function MainSettingsScreen({
  onNavigate,
  onBack,
}: {
  onNavigate: (id: MenuId) => void
  onBack: () => void
}) {
  const [showDebugDialog, setShowDebugDialog] = useState(false)

  const handleItemPress = (id: MenuId) => {
    if (id === "debug") {
      setShowDebugDialog(true)
    } else {
      onNavigate(id)
    }
  }

  return (
    <div className="relative w-full h-full bg-background flex flex-col">
      <div className="h-14 flex-shrink-0" />
      <div className="px-5 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground mb-5"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl font-semibold text-foreground mb-5">Settings</h1>
      </div>

      <div className="flex-1 px-5">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleItemPress(item.id)}
                className={`w-full flex items-center justify-between px-4 py-4 hover:bg-secondary/50 transition-colors ${
                  idx < MENU_ITEMS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    "destructive" in item && item.destructive
                      ? "bg-destructive/10"
                      : "bg-secondary"
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      "destructive" in item && item.destructive
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    "destructive" in item && item.destructive
                      ? "text-destructive"
                      : "text-foreground"
                  }`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Hidden Adventures v1.0.0
        </p>
      </div>

      <DebugLogsDialog
        open={showDebugDialog}
        onClose={() => setShowDebugDialog(false)}
      />
    </div>
  )
}

// ─── Root Settings Screen ────────────────────────────────────────────────────

interface SettingsScreenProps {
  onBack?: () => void
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [subScreen, setSubScreen] = useState<SubScreen>("main")

  const navigateTo = (id: MenuId) => {
    if (id === "feedback") setSubScreen("feedback")
    else if (id === "terms") setSubScreen("terms")
    else if (id === "privacy") setSubScreen("privacy")
    else if (id === "delete") setSubScreen("delete")
  }

  const goBack = () => setSubScreen("main")

  if (subScreen === "feedback") return <FeedbackScreen onBack={goBack} />
  if (subScreen === "terms") return <TermsScreen onBack={goBack} />
  if (subScreen === "privacy") return <PrivacyScreen onBack={goBack} />
  if (subScreen === "delete") return <DeleteAccountScreen onBack={goBack} />

  return <MainSettingsScreen onNavigate={navigateTo} onBack={onBack ?? (() => {})} />
}
