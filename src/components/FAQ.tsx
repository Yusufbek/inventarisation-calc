import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section className="w-full bg-secondary px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Tez-tez beriladigan savollar
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white rounded-2xl px-6 border-none">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              Qanday hisoblaymiz?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Hisoblash formula sizning do'kon turingiz, mahsulotlar soni, inventarizatsiya
              chastotasi va xato darajasiga asoslangan. Biz minglab do'konlarning real
              ma'lumotlaridan foydalanib, o'rtacha yo'qotishlarni aniqlaymiz.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white rounded-2xl px-6 border-none">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              Ma'lumotlar maxfiyligi
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Sizning barcha ma'lumotlaringiz maxfiy saqlanadi va faqat hisob-kitoblar
              uchun ishlatiladi. Biz sizning ma'lumotlaringizni hech kimga bermаymiz va
              uchinchi tomonlar bilan baham ko'rmaymiz.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white rounded-2xl px-6 border-none">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              Qancha vaqt oladi?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Kalkulyator to'liq to'ldirish 30 soniyadan kam vaqt oladi. 5 ta oddiy
              savolga javob bering va darhol natijani ko'ring.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white rounded-2xl px-6 border-none">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              BILLZ qanday yordam beradi?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              BILLZ - bu avtomatlashtirilgan inventarizatsiya tizimi bo'lib, real vaqtda
              stokni kuzatadi, yo'qotishlarni kamaytiradi va sizning vaqtingizni tejaydi.
              Tizim mobil ilova va veb-platforma orqali ishlaydi.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8 p-6 bg-white rounded-2xl text-center">
          <p className="text-muted-foreground italic">
            "BILLZ ishlatishdan oldin biz har oy 2-3 mln so'm yo'qotardik. Endi bu raqam
            70% ga kamaydi!" - Dilshod, Kiyim do'koni egasi
          </p>
        </div>
      </div>
    </section>
  );
};
