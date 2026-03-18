interface PersonalizedGreetingProps {
  language: 'BM' | 'EN';
}

export function PersonalizedGreeting({ language }: PersonalizedGreetingProps) {
  const currentHour = new Date().getHours();
  
  let greeting = '';
  if (language === 'BM') {
    greeting = currentHour < 12 ? 'Selamat Pagi' : currentHour < 18 ? 'Selamat Petang' : 'Selamat Malam';
  } else {
    greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  }
  
  const name = language === 'BM' ? 'Ahmad bin Abdullah' : 'Ahmad bin Abdullah';

  return (
    <div className="px-6 pt-6 pb-3 lg:px-0 lg:pt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <h1 className="text-xl font-bold text-[#003399] lg:text-2xl">
        {greeting}, {name}
      </h1>
    </div>
  );
}