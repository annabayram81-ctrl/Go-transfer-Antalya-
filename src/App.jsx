import { useMemo, useState } from 'react';

const TEST_PRICES = {
  'Аэропорт Анталья->Лара': 35,
  'Аэропорт Анталья->Кемер': 55,
  'Аэропорт Анталья->Белек': 45,
  'Аэропорт Анталья->Сиде': 60,
};

const WHATSAPP_PHONE = '905551112233';
const TELEGRAM_URL = 'https://t.me/go_transfer_antalya';

export default function App() {
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: 1,
    comment: '',
  });

  const [calculatedPrice, setCalculatedPrice] = useState(null);

  const routeKey = `${form.from.trim()}->${form.to.trim()}`;

  const messageText = useMemo(() => {
    return [
      'Здравствуйте! Хочу заказать трансфер:',
      `Откуда: ${form.from || '-'}`,
      `Куда: ${form.to || '-'}`,
      `Дата: ${form.date || '-'}`,
      `Время: ${form.time || '-'}`,
      `Пассажиров: ${form.passengers || '-'}`,
      `Комментарий: ${form.comment || '-'}`,
      calculatedPrice ? `Тестовая цена: €${calculatedPrice}` : 'Тестовая цена: не рассчитана',
      'Оплата водителю наличными.',
    ].join('\n');
  }, [form, calculatedPrice]);

  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(messageText)}`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? Number(value) : value,
    }));
  };

  const handleShowPrice = () => {
    const base = TEST_PRICES[routeKey];
    if (base) {
      const extraPassengerFee = form.passengers > 4 ? (form.passengers - 4) * 5 : 0;
      setCalculatedPrice(base + extraPassengerFee);
      return;
    }

    if (form.from && form.to) {
      setCalculatedPrice(50);
      return;
    }

    setCalculatedPrice(null);
  };

  return (
    <main className="page">
      <section className="card">
        <h1>Go Transfer Antalya</h1>
        <p className="subtitle">Удобный заказ трансфера по Анталье и окрестностям.</p>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Откуда едем?
            <input name="from" type="text" value={form.from} onChange={handleChange} placeholder="Например, Аэропорт Анталья" />
          </label>

          <label>
            Куда едем?
            <input name="to" type="text" value={form.to} onChange={handleChange} placeholder="Например, Лара" />
          </label>

          <div className="row">
            <label>
              Дата
              <input name="date" type="date" value={form.date} onChange={handleChange} />
            </label>

            <label>
              Время
              <input name="time" type="time" value={form.time} onChange={handleChange} />
            </label>
          </div>

          <label>
            Количество пассажиров
            <input name="passengers" type="number" min="1" max="20" value={form.passengers} onChange={handleChange} />
          </label>

          <label>
            Комментарий
            <textarea name="comment" rows="3" value={form.comment} onChange={handleChange} placeholder="Детское кресло, крупный багаж и т.д." />
          </label>

          <button className="primary" type="button" onClick={handleShowPrice}>
            Показать цену
          </button>
        </form>

        <p className="price">
          {calculatedPrice ? `Тестовая цена: €${calculatedPrice}` : 'Введите маршрут и нажмите «Показать цену»'}
        </p>

        <p className="note">
          Без карты и без онлайн-оплаты. Оплата водителю наличными.
        </p>

        <div className="contactButtons">
          <a className="contact whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="contact telegram" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </section>
    </main>
  );
}
