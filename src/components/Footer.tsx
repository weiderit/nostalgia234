export function Footer() {
  return (
    <footer className="mt-24 border-t border-cactus-100 bg-sand-100/40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10 grid gap-8 md:grid-cols-3 text-sm text-cactus-700">
        <div>
          <div className="font-display text-lg text-cactus-800 mb-2">🌵 Колючка и Ко</div>
          <p className="text-cactus-700/80">
            Кактусы и суккуленты для тех, кто любит растения,
            но забывает их поливать. С 2014 года.
          </p>
        </div>
        <div>
          <div className="font-medium text-cactus-800 mb-2">Доставка</div>
          <ul className="space-y-1 text-cactus-700/80">
            <li>Москва — день в день, от 1 шт</li>
            <li>Россия — СДЭК, 2–6 дней</li>
            <li>Бесплатно от 3&nbsp;500&nbsp;₽</li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-cactus-800 mb-2">Контакты</div>
          <ul className="space-y-1 text-cactus-700/80">
            <li>+7 (495) 123-45-67</li>
            <li>hello@kolyuchka.shop</li>
            <li>пн–вс, 10:00–20:00</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-10 pb-8 text-xs text-cactus-700/60">
        © {new Date().getFullYear()} «Колючка и Ко». Все колючки берегите.
      </div>
    </footer>
  );
}
