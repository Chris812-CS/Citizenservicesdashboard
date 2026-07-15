import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { 
  ArrowLeft, Menu, Bell, User, Calendar as CalendarIcon, MapPin, 
  Navigation, ChevronRight, Clock, CheckCircle2, 
  Stethoscope, Activity, Pill, UserPlus, HeartPulse, Building, MessageSquareText
} from "lucide-react";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";

export function AppointmentBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"BM" | "EN">(location.state?.language || "BM");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Flow State
  const [step, setStep] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("2026-04-03");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Mock Data
  const persons = [
    { id: "p1", name: "HEMALATA A/P VASUDAVAN", relationBM: "Diri Sendiri", relationEN: "Self", ic: "790820-14-5782" },
    { id: "p2", name: "MELLVINNA NAIR", relationBM: "Anak", relationEN: "Child", ic: "100715-10-1242" },
    { id: "p3", name: "YEESHH NAIR", relationBM: "Anak", relationEN: "Child", ic: "141124-10-2367" },
  ];

  const bookingRecords = [
    {
      id: "b1",
      person: "HEMALATA A/P VASUDAVAN",
      serviceBM: "Pesakit Luar",
      serviceEN: "Outpatient",
      facility: "Klinik Kesihatan Presint 18",
      date: "2026-04-10",
      time: "09:00 AM",
      statusBM: "Akan Datang",
      statusEN: "Upcoming"
    }
  ];

  const services = [
    { id: "s1", nameBM: "Klinik Pesakit Luar", nameEN: "Outpatient Clinic", icon: <Stethoscope className="w-6 h-6" /> },
    { id: "s2", nameBM: "Pergigian", nameEN: "Dental", icon: <Activity className="w-6 h-6" /> },
    { id: "s3", nameBM: "Farmasi (Ambil Ubat)", nameEN: "Pharmacy (Pick up medicine)", icon: <Pill className="w-6 h-6" /> },
    { id: "s4", nameBM: "Saringan Kesihatan", nameEN: "Health Screening", icon: <HeartPulse className="w-6 h-6" /> },
  ];

  const facilities = [
    { id: "f1", name: "Klinik Kesihatan Presint 18", distance: "2.5 km", address: "Presint 18, 62150 Putrajaya" },
    { id: "f2", name: "Hospital Putrajaya", distance: "5.2 km", address: "Presint 7, 62250 Putrajaya" },
    { id: "f3", name: "Klinik Kesihatan Presint 9", distance: "6.8 km", address: "Presint 9, 62250 Putrajaya" },
  ];

  const getSlotsForDate = (dateStr: string) => {
    // Return empty array for 2026-04-04 to trigger "No slots available"
    if (dateStr === "2026-04-04") return [];
    
    // Otherwise return some mock slots
    return ["08:30 AM", "09:00 AM", "10:30 AM", "11:00 AM", "02:30 PM", "03:00 PM"];
  };

  const nextAvailableSlots = [
    { date: "2026-04-05", slots: ["09:00 AM", "11:30 AM"] },
    { date: "2026-04-06", slots: ["08:30 AM", "02:00 PM", "03:30 PM"] },
    { date: "2026-04-07", slots: ["10:00 AM"] },
  ];

  const handleBack = () => {
    if (step > 1 && step < 6) {
      setStep(step - 1);
    } else {
      navigate("/super-app", { state: { language } });
    }
  };

  const availableSlots = getSlotsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-[#F8F9FA]" style={{ fontFamily: "Poppins, sans-serif" }}>
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

        <div className="flex-1 lg:overflow-auto relative">
          <div className="max-w-md mx-auto min-h-screen bg-[#F8F9FA] shadow-2xl lg:max-w-none lg:shadow-none pb-24 relative">
            
            {/* Header */}
            <header className="bg-white sticky top-0 z-40 border-b border-slate-200">
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <h1 className="font-semibold text-lg text-slate-800 ml-1 lg:ml-0 truncate">
                    {language === "BM" ? "Tempahan Janji Temu" : "Appointment Booking"}
                  </h1>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLanguage(language === "BM" ? "EN" : "BM")}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-[#003399] font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    {language}
                  </button>
                  <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </header>

            {/* Back Button (Floating) - Only show if not on success screen */}
            {step < 6 && (
              <div className="absolute top-20 left-4 z-30">
                <button
                  onClick={handleBack}
                  className="p-2.5 bg-white text-[#003399] hover:bg-slate-50 rounded-full shadow-md border border-slate-100 transition-all flex items-center justify-center"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="lg:max-w-3xl lg:mx-auto lg:px-8 lg:py-6 p-4 pt-16 mt-4">
              
              {/* Step 1: Select Person & View Records */}
              {step === 1 && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[340px] mb-6">
                    <h2 className="font-bold text-slate-800 text-lg mb-4">
                      {language === "BM" ? "Pilih Individu" : "Select Person"}
                    </h2>
                    <div className="space-y-3">
                      {persons.map(person => (
                        <button
                          key={person.id}
                          onClick={() => {
                            setSelectedPerson(person);
                            setStep(2);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-[#003399] hover:shadow-md transition-all text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#003399]/10 text-[#003399] flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{person.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {language === "BM" ? person.relationBM : person.relationEN} • {person.ic}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        </button>
                      ))}
                      <button className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors text-[#003399] font-medium text-sm">
                        <UserPlus className="w-4 h-4" />
                        {language === "BM" ? "Tambah Tanggungan" : "Add Dependent"}
                      </button>
                    </div>
                  </div>

                  <div className="w-full max-w-[340px]">
                    <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-[#003399]" />
                      {language === "BM" ? "Rekod Janji Temu" : "Booking Records"}
                    </h2>
                    <div className="space-y-3">
                      {bookingRecords.map(record => (
                        <div key={record.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-bold text-[#003399] text-sm">
                                {language === "BM" ? record.serviceBM : record.serviceEN}
                              </p>
                              <p className="text-xs text-slate-600 font-medium mt-1">{record.person}</p>
                            </div>
                            <span className="bg-blue-50 text-[#003399] border border-blue-100 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                              {language === "BM" ? record.statusBM : record.statusEN}
                            </span>
                          </div>
                          <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
                            <div className="flex items-start gap-2 text-slate-600">
                              <Building className="w-4 h-4 shrink-0 mt-0.5" />
                              <span className="text-xs">{record.facility}</span>
                            </div>
                            <div className="flex items-start gap-2 text-slate-600">
                              <CalendarIcon className="w-4 h-4 shrink-0 mt-0.5" />
                              <span className="text-xs">{record.date} • {record.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Service */}
              {step === 2 && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[340px] mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3 mb-6 border border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#003399]">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          {language === "BM" ? "Untuk:" : "For:"}
                        </p>
                        <p className="text-xs font-bold text-[#003399] leading-tight">{selectedPerson?.name}</p>
                      </div>
                    </div>

                    <h2 className="font-bold text-slate-800 text-lg mb-4 leading-tight">
                      {language === "BM" ? "Pilih Perkhidmatan Kesihatan" : "Select Health Service"}
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {services.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setSelectedService(service);
                            setStep(3);
                          }}
                          className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center gap-3 hover:border-[#003399] hover:bg-blue-50/50 transition-all shadow-sm"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#003399]/10 text-[#003399] flex items-center justify-center">
                            {service.icon}
                          </div>
                          <span className="font-semibold text-xs text-slate-700">
                            {language === "BM" ? service.nameBM : service.nameEN}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Select Facility */}
              {step === 3 && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[340px] mb-6">
                    <h2 className="font-bold text-slate-800 text-lg mb-4 leading-tight">
                      {language === "BM" ? "Pilih Fasiliti Kesihatan" : "Select Health Facility"}
                    </h2>

                    <button className="w-full bg-[#003399] text-white rounded-xl p-4 flex items-center justify-center gap-2 mb-6 shadow-md hover:bg-blue-800 transition-colors font-medium">
                      <Navigation className="w-5 h-5" />
                      {language === "BM" ? "Cari Hospital Terdekat (GPS)" : "Locate Nearest Hospital (GPS)"}
                    </button>

                    <div className="space-y-3">
                      {facilities.map(facility => (
                        <button
                          key={facility.id}
                          onClick={() => {
                            setSelectedFacility(facility);
                            setStep(4);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-[#003399] hover:shadow-md transition-all flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-slate-800 text-sm pr-4">{facility.name}</h3>
                            <span className="bg-[#FFC72C]/20 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                              {facility.distance}
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5 text-slate-500">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="text-xs leading-relaxed">{facility.address}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Select Date & Time */}
              {step === 4 && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[340px] mb-6">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 shadow-sm">
                      <h3 className="font-bold text-[#003399] text-sm mb-1">{selectedFacility?.name}</h3>
                      <p className="text-xs text-slate-500">{language === "BM" ? selectedService?.nameBM : selectedService?.nameEN}</p>
                    </div>

                    <h2 className="font-bold text-slate-800 text-lg mb-4">
                      {language === "BM" ? "Pilih Tarikh & Masa" : "Select Date & Time"}
                    </h2>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm">
                      <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                        {language === "BM" ? "Tarikh Pilihan" : "Selected Date"}
                      </label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg py-3 px-4 pl-10 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#003399] focus:ring-1 focus:ring-[#003399]"
                        />
                        <CalendarIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-slate-700 text-sm mb-3">
                        {language === "BM" ? "Slot Masa Tersedia" : "Available Time Slots"}
                      </h3>
                      
                      {availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {availableSlots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 px-2 rounded-lg text-sm font-semibold border transition-all ${
                                selectedSlot === slot 
                                  ? "bg-[#003399] text-white border-[#003399] shadow-md" 
                                  : "bg-white text-slate-700 border-slate-200 hover:border-[#003399] hover:bg-blue-50"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                          <p className="text-red-600 text-sm font-medium">
                            {language === "BM" ? "Tiada slot kosong untuk tarikh yang dipilih." : "No slots available for the selected date."}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Next Available Slots Section */}
                    {availableSlots.length === 0 && (
                      <div>
                        <h3 className="font-semibold text-slate-700 text-sm mb-3">
                          {language === "BM" ? "Slot Seterusnya" : "Next Available Slots"}
                        </h3>
                        <div className="space-y-4">
                          {nextAvailableSlots.map((day, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4">
                              <p className="font-bold text-[#003399] text-sm mb-3 flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                {day.date}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {day.slots.map(slot => (
                                  <button
                                    key={slot}
                                    onClick={() => {
                                      setSelectedDate(day.date);
                                      setSelectedSlot(slot);
                                    }}
                                    className={`py-2 px-3 rounded-md text-xs font-semibold border ${
                                      selectedDate === day.date && selectedSlot === slot
                                        ? "bg-[#003399] text-white border-[#003399]"
                                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#003399] hover:bg-blue-50"
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      <button
                        disabled={!selectedSlot || (availableSlots.length === 0 && selectedDate === "2026-04-04")}
                        onClick={() => setStep(5)}
                        className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-all ${
                          selectedSlot && !(availableSlots.length === 0 && selectedDate === "2026-04-04")
                            ? "bg-[#003399] hover:bg-blue-800" 
                            : "bg-slate-300 cursor-not-allowed"
                        }`}
                      >
                        {language === "BM" ? "Seterusnya" : "Next"}
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* Step 5: Summary & Confirm */}
              {step === 5 && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[340px]">
                    <h2 className="font-bold text-slate-800 text-lg mb-6 text-center">
                      {language === "BM" ? "Ringkasan Janji Temu" : "Booking Summary"}
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-6">
                      <div className="bg-[#003399] p-4 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10">
                          <CalendarIcon className="w-24 h-24 -mt-4 -mr-4" />
                        </div>
                        <h3 className="font-bold text-lg relative z-10">
                          {language === "BM" ? "Sahkan Butiran" : "Confirm Details"}
                        </h3>
                      </div>
                      
                      <div className="p-5 space-y-4">
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                            {language === "BM" ? "Nama Pesakit" : "Patient Name"}
                          </p>
                          <p className="font-bold text-slate-800">{selectedPerson?.name}</p>
                          <p className="text-xs text-slate-500">{selectedPerson?.ic}</p>
                        </div>
                        
                        <hr className="border-slate-100" />
                        
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                            {language === "BM" ? "Perkhidmatan" : "Service"}
                          </p>
                          <p className="font-bold text-slate-800">
                            {language === "BM" ? selectedService?.nameBM : selectedService?.nameEN}
                          </p>
                        </div>
                        
                        <hr className="border-slate-100" />
                        
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                            {language === "BM" ? "Fasiliti" : "Facility"}
                          </p>
                          <p className="font-bold text-slate-800">{selectedFacility?.name}</p>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 text-[#003399]">
                            <CalendarIcon className="w-5 h-5" />
                            <span className="font-bold text-sm">{selectedDate}</span>
                          </div>
                          <div className="w-px h-6 bg-slate-300"></div>
                          <div className="flex items-center gap-2 text-[#003399]">
                            <Clock className="w-5 h-5" />
                            <span className="font-bold text-sm">{selectedSlot}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(6)}
                      className="w-full bg-[#003399] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-800 transition-all"
                    >
                      {language === "BM" ? "Sahkan Janji Temu" : "Confirm Appointment"}
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="w-full mt-3 py-3 text-slate-500 font-semibold hover:text-slate-700 transition-colors"
                    >
                      {language === "BM" ? "Kembali untuk ubah" : "Back to edit"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6: Success */}
              {step === 6 && (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-full max-w-[340px]">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    
                    <h2 className="font-bold text-slate-800 text-2xl mb-2">
                      {language === "BM" ? "Berjaya!" : "Success!"}
                    </h2>
                    <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                      {language === "BM" 
                        ? "Janji temu anda telah berjaya ditempah. Satu SMS pengesahan telah dihantar ke nombor telefon anda." 
                        : "Your appointment has been successfully booked. A confirmation SMS has been sent to your phone."}
                    </p>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-8 text-left">
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                        {language === "BM" ? "No. Rujukan" : "Reference No."}
                      </p>
                      <p className="font-bold text-xl tracking-widest text-[#003399]">KKP18-8429</p>
                    </div>

                    <button
                      onClick={() => setStep(1)}
                      className="w-full bg-slate-100 text-[#003399] py-4 rounded-xl font-bold text-base hover:bg-slate-200 transition-all border border-slate-200"
                    >
                      {language === "BM" ? "Kembali ke Halaman Utama Tempahan" : "Back to Main Booking Page"}
                    </button>
                  </div>
                </div>
              )}

            </div>
            
            {/* Floating Chatbot Button */}
            <button
              onClick={() => navigate("/chatbot", { state: { language, from: location.pathname } })}
              className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-[#003399] text-white p-4 rounded-full shadow-xl hover:bg-[#002266] transition-transform hover:scale-105 z-50 flex items-center justify-center group"
              aria-label="AI Chatbot"
            >
              <MessageSquareText className="w-6 h-6" />
              <div className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {language === "BM" ? "Tanya Chatbot AI" : "Ask AI Chatbot"}
              </div>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
