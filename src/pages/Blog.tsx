import React from 'react';
import { BookOpen, Calendar, ArrowRight, TrendingUp, MessageSquare, Download, Building2, Laptop, Church, Users, Briefcase, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

export default function Blog() {
  const posts = [
    {
      title: "Say Bye to \"Multiple Taxation\": What the New NRS Tax Reforms Mean for Your Business",
      excerpt: "The massive new tax bill just dropped! Zero VAT on food, withholding tax exemptions for SMEs, and 60+ taxes merged into 8. Click here to see how your business benefits.",
      category: "Breaking News",
      date: "April 16, 2026",
      readTime: "6 min read",
      slug: "new-nrs-tax-reforms-2025",
      isFeatured: true
    },
    {
      title: "Wetin be TIN and Why You Need Am?",
      excerpt: "If you dey do business or you dey receive salary, government say you must get TIN. E easy and e free. See how to get yours.",
      category: "Pidgin Guides",
      date: "April 15, 2026",
      readTime: "3 min read",
      slug: "wetin-be-tin"
    },
    {
      title: "How Market Women Can Pay Small Small Tax",
      excerpt: "You don't need a big accountant to pay your tax. Learn how the new presumptive tax system makes it easy for market traders.",
      category: "Small Business",
      date: "April 12, 2026",
      readTime: "4 min read",
      slug: "market-women-tax"
    },
    {
      title: "Is NRS Tracking My Bank Account?",
      excerpt: "Understand how your BVN links to your tax profile, what data protection (NDPR) means for you, and why you shouldn't panic.",
      category: "Tax Security",
      date: "April 10, 2026",
      readTime: "5 min read",
      slug: "nrs-bank-tracking"
    }
  ];

  const downloads = [
    { name: "2026 National Tax Policy", type: "PDF", size: "2.4 MB" },
    { name: "Presumptive Tax Guidelines for Informal Sector", type: "PDF", size: "1.1 MB" },
    { name: "NDPR Compliance Framework for SMEs", type: "PDF", size: "3.5 MB" },
    { name: "Exempted Items under New VAT Rule", type: "PDF", size: "800 KB" }
  ];

  const ecosystem = [
    { icon: Building2, title: "Accounting Executives", desc: "Advanced CIT frameworks, ledger compliance, and corporate updates.", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Church, title: "Places of Worship", desc: "Guidelines on non-profit exemptions, PAYE for staff, and donations.", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Laptop, title: "Tech & Freelancers", foreign: true, desc: "Exporting services, dollar income, and tech hub tax breaks.", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Users, title: "Traders & Novice", desc: "Simple presumptive tax, no big grammar, avoiding extortion.", color: "text-amber-600", bg: "bg-amber-50" }
  ];

  const handleDownload = (e: React.MouseEvent, docName: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Dynamically generate a valid PDF file
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("NRS Official Document Simulation", 20, 20);
    
    // Add title
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(`Title: ${docName}`, 20, 35);
    
    // Add disclaimer note
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    const splitText = doc.splitTextToSize(
      "*Note: This is a secure PDF placeholder downloaded from the MyTaxGenius AI portal. In a real production environment, this would be linked to an actual uploaded PDF file in your database.*",
      170
    );
    doc.text(splitText, 20, 50);
    
    // Trigger the safe download with a thoroughly sanitized filename
    const safeName = docName.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').toLowerCase();
    doc.save(`${safeName}.pdf`);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      {/* 🚀 HUB HERO CTA */}
      <section className="bg-[#0F172A] py-20 px-4 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Complete Ecosystem Tax Library</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            From top accounting executives to market traders and places of worship. Access official NRS policy downloads and sector-specific guides tailored just for you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 📚 OFFICIAL DOWNLOADS */}
        <div>
          <div className="flex items-center justify-between mb-8 text-slate-900 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center">
              <FileText className="w-8 h-8 mr-3 text-emerald-600" /> 
              Official NRS Policy Downloads
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {downloads.map((doc, idx) => (
              <div 
                key={idx} 
                onClick={(e) => handleDownload(e, doc.name)}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                     <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 leading-tight mb-2 group-hover:text-emerald-700 transition-colors">{doc.name}</h3>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{doc.type} • {doc.size}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white text-slate-400 transition-colors">
                    <Download className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌐 ECOSYSTEM GUIDES */}
        <div>
           <div className="flex items-center justify-between mb-8 text-slate-900 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" /> 
              Guides Tailored to Your Sector
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {ecosystem.map((item, idx) => (
              <Link to="/chat" key={idx} className="flex bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group text-left">
                <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                    Explore with AI <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 📰 LATEST ARTICLES */}
        <div>
          <div className="flex items-center justify-between mb-8 text-slate-900 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-orange-500" /> 
              Latest Insights & News
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <div key={idx} className={`bg-white rounded-3xl p-8 shadow-sm border ${post.isFeatured ? 'border-orange-300 shadow-[0_4px_20px_rgb(249,115,22,0.1)]' : 'border-slate-200'} hover:shadow-xl transition-all group flex flex-col`}>
                {post.isFeatured && (
                   <div className="flex items-center text-orange-600 font-bold mb-5 bg-orange-50 w-max px-3 py-1.5 rounded-full text-xs tracking-wider uppercase">
                     <TrendingUp className="w-3 h-3 mr-1.5" /> Latest Policy Update
                   </div>
                )}
                {!post.isFeatured && (
                   <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-extrabold mb-5 uppercase tracking-wider w-max">
                     {post.category}
                   </span>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 mb-8 text-lg leading-relaxed flex-grow font-medium">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-center text-sm text-slate-400 font-bold space-x-4">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-emerald-600 font-extrabold flex items-center hover:text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-xl">
                    Read <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🤖 CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-[2.5rem] p-12 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 tracking-tight">Need instant interpretation?</h3>
            <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed">
              Don't want to read through the heavy policy documents? Our secure AI has been trained on the latest NRS directives. Ask a question and get answers instantly.
            </p>
            <Link to="/chat" className="inline-flex items-center bg-emerald-500 text-white font-extrabold py-5 px-10 rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:bg-emerald-400 hover:-translate-y-1 transition-all">
              Chat with Tax AI <MessageSquare className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}