import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Building2, FileCheck } from 'lucide-react';

export const OskayiFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B0F19] text-slate-400 text-xs border-t border-slate-800/80 pt-10 pb-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
                O
              </div>
              <span className="font-bold text-white text-base tracking-tight">OSKAYI CONSULT</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold uppercase tracking-wider">
                Enterprise Suite
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md">
              Institutional AI Architecture, Construction Cost Control, Automated Renovation, and Smart Municipal Urban Planning.
            </p>
          </div>

          {/* Statutory Registration Badges */}
          <div className="flex flex-wrap gap-2 text-[11px]">
            <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
              <FileCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Reg: <strong>BN248851025</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TIN: <strong>P0000590118</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Incorporated: <strong>Act 151</strong></span>
            </div>
          </div>
        </div>

        {/* Contact and address row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-400 text-xs">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Accra Financial Centre, High Street, Accra, Ghana</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-amber-400 shrink-0" />
            <a href="mailto:info@oskayi.com" className="hover:text-amber-400 transition-colors">
              info@oskayi.com
            </a>
          </div>
          <div className="flex items-center space-x-2 md:justify-end">
            <Phone className="w-4 h-4 text-amber-400 shrink-0" />
            <a href="tel:+233244905505" className="hover:text-amber-400 transition-colors font-mono">
              +233 24 490 5505
            </a>
          </div>
        </div>

        {/* Currency & secular compliance statement */}
        <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Oskayi Consult Ltd. All Rights Reserved. All billing transactions strictly denominated in USD ($).
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400">Security Audited</span>
            <span>•</span>
            <span className="hover:text-slate-400">Paystack Verified Merchant</span>
            <span>•</span>
            <span className="hover:text-slate-400">Institutional Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
