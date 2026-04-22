import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  // Mock database for the newly created informative post
  // For other clicked posts, we'll show a generic placeholder
  const isLatestPost = slug === 'new-nrs-tax-reforms-2025';

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-green-700 font-bold hover:text-green-800 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>
        
        {isLatestPost ? (
          <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold mb-4 uppercase tracking-wider flex items-center w-max">
                <TrendingUp className="w-3 h-3 mr-2" /> Breaking News
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Say Bye to "Multiple Taxation": What the New NRS Tax Reforms Mean for Your Business
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-500 font-medium gap-4 border-b border-gray-100 pb-8">
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> April 16, 2026</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 6 min read</span>
                <span className="flex items-center font-bold text-green-700"><ShieldCheck className="w-4 h-4 mr-1.5" /> Verified by NaijaTax AI Experts</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg prose-green max-w-none text-gray-700">
              <p className="lead text-xl leading-relaxed font-medium text-gray-600 mb-8">
                If you run a business in Nigeria, you've probably felt the sting of paying what feels like 100 different taxes to local, state, and federal governments. Good news: The Presidential Committee on Fiscal Policy and Tax Reforms just flipped the script. Here is exactly what is changing.
              </p>

              <h3 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mt-10 mb-4 text-gray-900">1. From 60+ Taxes Down to Just 8</h3>
              <p className="mb-6">
                For decades, businesses have suffered from "nuisance taxes"—radio/TV levies, hawking permits, haulage fees, and signage taxes demanded by overlapping agencies. Under the new reforms, all these illegal or duplicative taxes are being scrapped globally. The government is consolidating everything into just <strong>8 primary tax items</strong>. This single move will kill the "area boy" tax collection model and standardize accounting for SMEs.
              </p>

              <h3 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mt-10 mb-4 text-gray-900">2. Exemption from Withholding Tax (WHT) for Small Businesses</h3>
              <p className="mb-6">
                Previously, small businesses had their capital tied up because clients would withhold 5% to 10% of their payments as WHT. The new policy <strong>completely exempts small businesses (SMEs)</strong> from this deduction. If your turnover is under the designated threshold, clients must pay you your invoice in full. Your cash flow just got a massive boost.
              </p>

              <div className="bg-green-50 p-6 rounded-2xl my-8 border border-green-100">
                <h4 className="font-extrabold text-green-800 mb-2">💡 Quick AI Tip:</h4>
                <p className="text-green-700 text-sm">
                  You can use our <strong>E-Invoice tool</strong> to automatically generate invoices that apply these new rules—preventing clients from illegally withholding your funds.
                </p>
              </div>

              <h3 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mt-10 mb-4 text-gray-900">3. Zero VAT on Food and Essentials</h3>
              <p className="mb-6">
                Selling tomatoes, medicine, or offering educational services? Your goods and services are officially zero-rated for VAT. You no longer need to frustrate your customers by adding 7.5% exactly on basic survival commodities. This brings massive relief to the agricultural and pharmaceutical sectors. 
              </p>

              <h3 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mt-10 mb-4 text-gray-900">4. Only the Wealthy Target Bracket Sees PIT Increases</h3>
              <p className="mb-6">
                The Personal Income Tax (PIT) brackets for the low-income and middle-class have been expanded to protect them from inflation. If you earn minimum wage or slightly above, your PAYE deductions will drop drastically. The burden is effectively being shifted to high-net-worth individuals earning above ₦50M annually.
              </p>

              <h3 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mt-10 mb-4 text-gray-900">What This Means For Your Accountant</h3>
              <p className="mb-8">
                With fewer tax lines, compliance accounting is finally straightforward. You no longer need to hire a massive consulting firm just to keep local governments off your back. The focus now is on <strong>honest, single-point filing</strong>. 
              </p>

              <hr className="my-10 border-gray-200" />
              
              <div className="text-center bg-gray-50 p-8 rounded-2xl">
                <h4 className="text-xl font-extrabold text-gray-900 mb-3">Does your business qualify for the new exemptions?</h4>
                <p className="text-gray-600 mb-6">Our AI Assistant has been updated with these exact policies. Ask NaijaTax AI right now.</p>
                <Link to="/chat" className="inline-block bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-green-800 transition-colors">
                  Ask NaijaTax AI Now
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article coming soon!</h1>
            <p className="text-gray-600 mb-8">Our tax professionals are currently verifying the information for this post.</p>
            <Link to="/blog" className="inline-block bg-green-100 text-green-800 font-bold px-8 py-4 rounded-xl hover:bg-green-200 transition-colors">
              Read other articles
            </Link>
          </article>
        )}
      </div>
    </div>
  );
}
