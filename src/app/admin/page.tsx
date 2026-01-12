"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [activeSection, setActiveSection] = useState("topBanner");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage("Değişiklikler kaydedildi!");
      } else {
        setMessage("Hata oluştu!");
      }
    } catch {
      setMessage("Hata oluştu!");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateField = (section: string, field: string, value: unknown) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: {
        ...(content[section] as Record<string, unknown>),
        [field]: value,
      },
    });
  };

  const sections = [
    { key: "topBanner", label: "Üst Banner" },
    { key: "header", label: "Header" },
    { key: "hero", label: "Hero Bölümü" },
    { key: "trendSection", label: "Trend Bölümü" },
    { key: "storySection", label: "Hikaye Bölümü" },
    { key: "investmentSection", label: "Yatırım Bölümü" },
    { key: "footer", label: "Footer" },
  ];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#2f3237] text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Han Kuyumculuk - Admin Paneli</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:underline" target="_blank">
            Siteyi Görüntüle →
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#dccdbf] text-[#2f3237] px-4 py-2 text-sm font-medium hover:bg-[#c9b9a8] disabled:opacity-50"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className="bg-green-500 text-white text-center py-2 text-sm">
          {message}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-64px)]">
          <nav className="py-4">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-6 py-3 text-sm transition-colors ${
                  activeSection === section.key
                    ? "bg-[#dccdbf] text-[#2f3237] font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#2f3237] mb-6">
              {sections.find((s) => s.key === activeSection)?.label}
            </h2>

            {/* Top Banner */}
            {activeSection === "topBanner" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Metni
                  </label>
                  <input
                    type="text"
                    value={(content.topBanner as Record<string, unknown>)?.text as string || ""}
                    onChange={(e) => updateField("topBanner", "text", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(content.topBanner as Record<string, unknown>)?.visible as boolean || false}
                    onChange={(e) => updateField("topBanner", "visible", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-gray-700">Banner Görünür</label>
                </div>
              </div>
            )}

            {/* Hero */}
            {activeSection === "hero" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={(content.hero as Record<string, unknown>)?.title as string || ""}
                    onChange={(e) => updateField("hero", "title", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Başlık
                  </label>
                  <input
                    type="text"
                    value={(content.hero as Record<string, unknown>)?.subtitle as string || ""}
                    onChange={(e) => updateField("hero", "subtitle", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buton Metni
                  </label>
                  <input
                    type="text"
                    value={(content.hero as Record<string, unknown>)?.ctaText as string || ""}
                    onChange={(e) => updateField("hero", "ctaText", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arkaplan Görseli (URL)
                  </label>
                  <input
                    type="text"
                    value={(content.hero as Record<string, unknown>)?.backgroundImage as string || ""}
                    onChange={(e) => updateField("hero", "backgroundImage", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Story Section */}
            {activeSection === "storySection" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={(content.storySection as Record<string, unknown>)?.title as string || ""}
                    onChange={(e) => updateField("storySection", "title", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ana Metin
                  </label>
                  <textarea
                    value={(content.storySection as Record<string, unknown>)?.mainText as string || ""}
                    onChange={(e) => updateField("storySection", "mainText", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm h-32"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Metin
                  </label>
                  <textarea
                    value={(content.storySection as Record<string, unknown>)?.subText as string || ""}
                    onChange={(e) => updateField("storySection", "subText", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm h-24"
                  />
                </div>
              </div>
            )}

            {/* Investment Section */}
            {activeSection === "investmentSection" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık (satır atlama için \n kullanın)
                  </label>
                  <textarea
                    value={(content.investmentSection as Record<string, unknown>)?.title as string || ""}
                    onChange={(e) => updateField("investmentSection", "title", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={(content.investmentSection as Record<string, unknown>)?.description as string || ""}
                    onChange={(e) => updateField("investmentSection", "description", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buton Metni
                  </label>
                  <input
                    type="text"
                    value={(content.investmentSection as Record<string, unknown>)?.ctaText as string || ""}
                    onChange={(e) => updateField("investmentSection", "ctaText", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            {activeSection === "footer" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slogan
                  </label>
                  <input
                    type="text"
                    value={(content.footer as Record<string, unknown>)?.slogan as string || ""}
                    onChange={(e) => updateField("footer", "slogan", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telif Hakkı Metni
                  </label>
                  <input
                    type="text"
                    value={(content.footer as Record<string, unknown>)?.copyright as string || ""}
                    onChange={(e) => updateField("footer", "copyright", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Header Section */}
            {activeSection === "header" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Alt Metni
                  </label>
                  <input
                    type="text"
                    value={(content.header as Record<string, unknown>)?.logoAlt as string || ""}
                    onChange={(e) => updateField("header", "logoAlt", e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Trend Section */}
            {activeSection === "trendSection" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sol Başlık
                    </label>
                    <input
                      type="text"
                      value={(content.trendSection as Record<string, unknown>)?.leftTitle as string || ""}
                      onChange={(e) => updateField("trendSection", "leftTitle", e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sağ Başlık
                    </label>
                    <input
                      type="text"
                      value={(content.trendSection as Record<string, unknown>)?.rightTitle as string || ""}
                      onChange={(e) => updateField("trendSection", "rightTitle", e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sol Kategori
                    </label>
                    <input
                      type="text"
                      value={(content.trendSection as Record<string, unknown>)?.leftCategory as string || ""}
                      onChange={(e) => updateField("trendSection", "leftCategory", e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sağ Kategori
                    </label>
                    <input
                      type="text"
                      value={(content.trendSection as Record<string, unknown>)?.rightCategory as string || ""}
                      onChange={(e) => updateField("trendSection", "rightCategory", e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
