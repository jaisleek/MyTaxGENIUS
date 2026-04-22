import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<'paye' | 'cit'>('paye');
  const [salary, setSalary] = useState('');
  const [revenue, setRevenue] = useState('');

  const calculatePAYE = () => {
    const monthlySalary = parseFloat(salary);
    if (!monthlySalary || isNaN(monthlySalary)) return 0;
    
    // Highly simplified mock of Nigerian PAYE Calculation for prototype
    const grossAnnual = monthlySalary * 12;
    const consolidatedRelief = 200000 + (0.2 * grossAnnual);
    const taxableIncome = Math.max(0, grossAnnual - consolidatedRelief);
    
    // Mock progressive tax... just a flat assumed rate for quick MVP
    const annualTax = taxableIncome * 0.15; // Rough estimate
    return annualTax / 12; // Return monthly
  };

  const calculateCIT = () => {
    const annualRevenue = parseFloat(revenue);
    if (!annualRevenue || isNaN(annualRevenue)) return 0;
    // Exempt if under 25 million
    if (annualRevenue < 25000000) return 0;
    // 20% if between 25m and 100m
    if (annualRevenue <= 100000000) return annualRevenue * 0.2;
    // 30% if over 100m
    return annualRevenue * 0.3;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-10 text-center">
        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
          <CalcIcon className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Tax Calculator</h1>
        <p className="text-gray-600 mt-2">Instantly estimate your PAYE or Company Income Tax legally required by NRS.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button 
            className={`flex-1 py-4 text-center font-bold text-sm ${activeTab === 'paye' ? 'text-blue-700 bg-white border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('paye')}
          >
            PAYE (Salary Earners)
          </button>
          <button 
            className={`flex-1 py-4 text-center font-bold text-sm ${activeTab === 'cit' ? 'text-green-700 bg-white border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('cit')}
          >
            CIT (Company Income Tax)
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'paye' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Gross Salary (₦)</label>
                <input 
                  type="number" 
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xl font-medium"
                />
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-sm font-medium text-blue-900 mb-2">Estimated Monthly PAYE Deduction</p>
                <p className="text-4xl font-bold text-blue-700">₦ {calculatePAYE().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p className="text-sm text-blue-600 mt-3 pt-3 border-t border-blue-200">
                  This assumes standard consolidated relief allowances. Pensions, NHIS, and NHF will affect the final taxable amount.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Gross Turnover / Revenue (₦)</label>
                <input 
                  type="number" 
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g. 30000000"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 text-xl font-medium"
                />
              </div>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <p className="text-sm font-medium text-green-900 mb-2">Estimated Annual CIT Due</p>
                <p className="text-4xl font-bold text-green-700">₦ {calculateCIT().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                
                <div className="mt-4 text-sm text-green-700 space-y-1">
                  {parseFloat(revenue) < 25000000 && (
                    <p><strong>Exempted!</strong> Turnover is under ₦25m.</p>
                  )}
                  {parseFloat(revenue) >= 25000000 && parseFloat(revenue) <= 100000000 && (
                    <p><strong>20% Rate applied</strong> (Medium company turnover ₦25m - ₦100m).</p>
                  )}
                  {parseFloat(revenue) > 100000000 && (
                    <p><strong>30% Rate applied</strong> (Large company turnover above ₦100m).</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
