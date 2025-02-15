import CardAbout from "../CardAbout"; 

const WhyUsSection = () => {
  const features = [
    {
      icon: "/icons/prize.svg",
      title: "جودة أصلية 100%",
      description: "نوفر لك عطورًا فاخرة وأصلية من أشهر العلامات التجارية العالمية.",
    },
    {
      icon: "/icons/Attach money.svg",
      title: "أسعار تنافسية",
      description: "نضمن لك الحصول على أفضل الأسعار مقارنة بالجودة العالية لمنتجاتنا.",
    },
    {
      icon: "/icons/Rose.svg",
      title: "تشكيلة واسعة",
      description: "لدينا مجموعة متنوعة من العطور تناسب جميع الأذواق والمناسبات.",
    },
    {
      icon: "/icons/Featured seasonal and gifts.svg",
      title: "عروض  حصرية",
      description: "استمتع بأفضل العروض والتخفيضات اليومية .",
    },
    {
      icon: "/icons/Truck.svg",
      title: "توصيل سريع وآمن",
      description: "نضمن لك وصول طلبك بأسرع وقت وفي أفضل حالة.",
    },
    {
      icon: "/icons/Phone.svg",
      title: "خدمة عملاء مميزة",
      description: "فريقنا جاهز دائمًا لمساعدتك في اختيار العطر المثالي لك.",
    },
  ];

  return (
    <section className="py-20 justify-evenly items-center bg-white flex flex-col gap-8">
      
      <h2 className="text-[50px] font-extrabold mb-8"> MB PARFUMS  لماذا</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 justify-center">
        {features.map((feature, index) => (
          <CardAbout key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
