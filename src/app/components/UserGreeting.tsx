export function UserGreeting() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Selamat Pagi' : currentHour < 18 ? 'Selamat Petang' : 'Selamat Malam';

  return (
    <div className="mb-6 px-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-1">{greeting},</h2>
      <p className="text-base text-slate-600">Ahmad bin Abdullah</p>
    </div>
  );
}