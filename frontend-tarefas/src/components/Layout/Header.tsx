import { CheckCircle, User } from "lucide-react";

function Header() {
  return (
    <header className="bg-slate-900 shadow-md border-b border-slate-700 text-slate-100">
      <div className="container mx-auto max-w-7xl px-6 py-1 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-sky-400" />
          <h1 className="text-2xl font-bold text-slate-50 tracking-tight">
            Task<span className="text-sky-400">Flow</span>
          </h1>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm font-medium text-slate-300 hover:text-sky-400 transition"
          >
            Minhas Tarefas
          </a>
          <a
            href="#"
            className="text-sm font-medium text-slate-300 hover:text-sky-400 transition"
          >
            Relatórios
          </a>

          <div className="flex items-center gap-2 pl-4 border-l border-slate-700">
            <span className="text-sm text-slate-400">Gustavo</span>
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
              <User className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
