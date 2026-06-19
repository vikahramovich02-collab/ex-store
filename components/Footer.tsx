import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20">
      <div className="px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-lg font-semibold tracking-[0.35em] lowercase mb-3">ex</p>
            <p className="text-[11px] text-gray-500 leading-relaxed tracking-wide">
              бывшие
            </p>
          </div>

          {/* Catalog */}
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-gray-400 mb-4">
              КАТАЛОГ
            </p>
            <ul className="space-y-2.5">
              {[
                ["ex female", "/female"],
                ["ex male", "/male"],
                ["Спортивные костюмы", "/female"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[11px] text-gray-600 hover:text-black transition-colors tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-gray-400 mb-4">
              ИНФОРМАЦИЯ
            </p>
            <ul className="space-y-2.5">
              {[
                ["О бренде", "/about"],
                ["Доставка и оплата", "/delivery"],
                ["Возврат и обмен", "/returns"],
                ["Контакты", "/contacts"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[11px] text-gray-600 hover:text-black transition-colors tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-gray-400 mb-4">
              СОЦСЕТИ
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wide font-medium text-black hover:text-gray-600 transition-colors nav-link w-fit"
              >
                Instagram
              </a>
              <a
                href="https://t.me/exxxxby"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wide text-gray-500 hover:text-black transition-colors nav-link w-fit"
              >
                Telegram
              </a>
              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wide text-gray-500 hover:text-black transition-colors nav-link w-fit"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-[10px] text-gray-400 tracking-wide">
            © 2026 ex. Производство: Беларусь.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              ["Публичная оферта", "/offer"],
              ["Политика конфиденциальности", "/privacy"],
              ["Возврат", "/returns"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-[10px] text-gray-400 hover:text-black transition-colors tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
