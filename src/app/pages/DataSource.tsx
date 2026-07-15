import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { DesktopSidebar } from '../components/v3/DesktopSidebar';
import { SuperAppHeader } from '../components/v3/SuperAppHeader';
import { Database, Download, FileText, ArrowLeft, BarChart2, PieChart as PieChartIcon, ChevronDown, Search, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const datasets = [
  { id: 'health', titleBM: 'Data Kesihatan Awam 2026', titleEN: 'Public Health Data 2026', descBM: 'Dataset ini mengandungi statistik kesihatan awam terkini dari pelbagai negeri di Malaysia.', descEN: 'This dataset contains the latest public health statistics from various states in Malaysia.' },
  { id: 'education', titleBM: 'Statistik Pendidikan 2026', titleEN: 'Education Statistics 2026', descBM: 'Data menyeluruh mengenai kemasukan sekolah dan kadar literasi.', descEN: 'Comprehensive data on school enrollment and literacy rates.' },
  { id: 'economy', titleBM: 'Penunjuk Ekonomi 2026', titleEN: 'Economy Indicators 2026', descBM: 'Statistik ekonomi utama termasuk KDNK, inflasi, dan kadar pekerjaan.', descEN: 'Key economic statistics including GDP, inflation, and employment rates.' },
  { id: 'transport', titleBM: 'Data Pengangkutan 2026', titleEN: 'Transportation Data 2026', descBM: 'Analisis pengangkutan awam dan penggunaan kenderaan.', descEN: 'Analysis of public transportation and vehicle usage.' },
];

const healthData = [
  { name: 'Kuala Lumpur', cases: 4000, recovered: 3800 },
  { name: 'Selangor', cases: 3000, recovered: 2800 },
  { name: 'Penang', cases: 2000, recovered: 1900 },
  { name: 'Johor', cases: 2780, recovered: 2600 },
  { name: 'Perak', cases: 1890, recovered: 1700 },
];

const pieData = [
  { name: 'Dengue', value: 400 },
  { name: 'Covid-19', value: 300 },
  { name: 'Influenza', value: 300 },
  { name: 'Tuberculosis', value: 200 },
];

const COLORS = ['#003399', '#CC0001', '#FFC72C', '#4ade80'];

export function DataSource() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'BM' | 'EN'>(location.state?.language || 'BM');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<'bar' | 'pie'>('bar');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDatasetId, setSelectedDatasetId] = useState(datasets[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = () => {
    setLanguage(language === 'BM' ? 'EN' : 'BM');
  };

  const handleDownload = () => {
    alert(language === 'BM' ? 'Muat turun bermula...' : 'Download started...');
  };

  const filteredDatasets = datasets.filter((ds) => {
    const query = searchQuery.toLowerCase();
    return ds.titleBM.toLowerCase().includes(query) || ds.titleEN.toLowerCase().includes(query);
  });

  const selectedDataset = datasets.find(d => d.id === selectedDatasetId) || datasets[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <DesktopSidebar 
        language={language} 
        isMobile 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="lg:flex lg:min-h-screen">
        <div className="hidden lg:block">
          <DesktopSidebar language={language} />
        </div>

        <div className="flex-1 lg:overflow-auto">
          <div className="max-w-md mx-auto min-h-screen bg-[#F8F9FA] shadow-2xl lg:max-w-none lg:shadow-none relative">
            <SuperAppHeader 
              language={language} 
              onLanguageToggle={toggleLanguage} 
              onMenuClick={() => setIsMobileMenuOpen(true)} 
            />

            {/* Back Navigation Bar */}
            <div className="bg-[#003399] px-4 py-3 flex items-center text-white lg:hidden">
              <button onClick={() => navigate(-1)} className="p-1 -ml-1 mr-2 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="font-bold text-sm">
                {language === 'BM' ? 'Sumber Data Terbuka' : 'Open Data Source'}
              </h2>
            </div>
            
            <div className="p-4 lg:p-8 lg:max-w-5xl lg:mx-auto">
              {/* Desktop Header */}
              <div className="hidden lg:flex items-center gap-3 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-[#003399]">
                    {language === 'BM' ? 'Sumber Data Terbuka' : 'Open Data Source'}
                  </h1>
                  <p className="text-slate-500">
                    {language === 'BM' ? 'Akses data rasmi kerajaan' : 'Access official government data'}
                  </p>
                </div>
              </div>

              {/* Data Overview Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6 relative">
                
                {/* Dropdown Dataset Selector */}
                <div className="mb-6 relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 bg-[#003399]/10 text-[#003399] rounded-xl flex items-center justify-center shrink-0">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm md:text-lg leading-tight">
                          {language === 'BM' ? selectedDataset.titleBM : selectedDataset.titleEN}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {language === 'BM' ? 'Tukar dataset' : 'Change dataset'}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 z-20 overflow-hidden">
                      <div className="p-3 border-b border-slate-100">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder={language === 'BM' ? 'Cari dataset...' : 'Search datasets...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399]/20"
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredDatasets.length > 0 ? (
                          filteredDatasets.map((ds) => (
                            <button
                              key={ds.id}
                              onClick={() => {
                                setSelectedDatasetId(ds.id);
                                setIsDropdownOpen(false);
                                setSearchQuery('');
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                selectedDatasetId === ds.id 
                                  ? 'bg-[#003399]/5 text-[#003399] font-semibold' 
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {language === 'BM' ? ds.titleBM : ds.titleEN}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-sm text-slate-500">
                            {language === 'BM' ? 'Tiada dataset dijumpai.' : 'No datasets found.'}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-slate-500 flex items-center gap-1 font-medium bg-slate-50 px-3 py-1.5 rounded-full">
                    <FileText className="w-3.5 h-3.5 text-[#003399]" />
                    {language === 'BM' ? 'Kemas kini terakhir: Hari ini' : 'Last updated: Today'}
                  </p>
                </div>

                <p className="text-sm text-slate-600 mb-6">
                  {language === 'BM' ? selectedDataset.descBM : selectedDataset.descEN}
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedChart('bar')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                      selectedChart === 'bar' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <BarChart2 className="w-4 h-4" />
                    Bar
                  </button>
                  <button 
                    onClick={() => setSelectedChart('pie')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                      selectedChart === 'pie' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <PieChartIcon className="w-4 h-4" />
                    Pie
                  </button>
                </div>
              </div>

              {/* Chart Container */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6 h-[350px]">
                <h4 className="font-bold text-slate-800 mb-4 text-center">
                  {selectedChart === 'bar' 
                    ? (language === 'BM' ? `Statistik Bar: ${selectedDataset.titleBM}` : `Bar Statistics: ${selectedDataset.titleEN}`)
                    : (language === 'BM' ? `Carta Pai: ${selectedDataset.titleBM}` : `Pie Chart: ${selectedDataset.titleEN}`)}
                </h4>
                <div className="w-full h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {selectedChart === 'bar' ? (
                      <BarChart data={healthData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="cases" name={language === 'BM' ? 'Kes' : 'Cases'} fill="#003399" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="recovered" name={language === 'BM' ? 'Pulih' : 'Recovered'} fill="#4ade80" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Download Section */}
              <button
                onClick={handleDownload}
                className="w-full bg-[#003399] hover:bg-[#002266] text-white font-bold py-4 rounded-xl transition-colors shadow-md text-base flex justify-center items-center gap-2"
              >
                <Download className="w-5 h-5" />
                {language === 'BM' ? 'Muat Turun Dataset (CSV)' : 'Download Dataset (CSV)'}
              </button>

              {/* Open Data Portal Link */}
              <a
                href="https://data.gov.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border-2 border-[#003399] text-[#003399] hover:bg-[#003399] hover:text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-base flex justify-center items-center gap-2 mt-3"
              >
                <ExternalLink className="w-5 h-5" />
                {language === 'BM' ? 'Portal Data Terbuka Malaysia' : 'Malaysia Open Data Portal'}
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
