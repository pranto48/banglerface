import { Article, Category } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name_bn: 'সর্বশেষ', name_en: 'Latest', slug: 'latest', order_index: 0 },
  { id: 'cat-2', name_bn: 'বাংলাদেশ', name_en: 'Bangladesh', slug: 'bangladesh', order_index: 1 },
  { id: 'cat-3', name_bn: 'অর্থনীতি', name_en: 'Economy', slug: 'the-economy', order_index: 2 },
  { id: 'cat-4', name_bn: 'সারাদেশ', name_en: 'Countrywide', slug: 'the-whole-country', order_index: 3 },
  { id: 'cat-5', name_bn: 'আন্তর্জাতিক', name_en: 'International', slug: 'international', order_index: 4 },
  { id: 'cat-6', name_bn: 'বিনোদন', name_en: 'Entertainment', slug: 'entertainment', order_index: 5 },
  { id: 'cat-7', name_bn: 'শিক্ষা', name_en: 'Education', slug: 'education', order_index: 6 },
  { id: 'cat-8', name_bn: 'সম্পাদকীয়', name_en: 'Editorial', slug: 'editorial', order_index: 7 },
  { id: 'cat-9', name_bn: 'রাজনীতি', name_en: 'Politics', slug: 'politics', order_index: 8 },
  { id: 'cat-10', name_bn: 'বিশেষ প্রতিবেদন', name_en: 'Special Report', slug: 'special-report', order_index: 9 },
  { id: 'cat-11', name_bn: 'বাণিজ্য', name_en: 'Business', slug: 'business', order_index: 10 },
  { id: 'cat-12', name_bn: 'খেলা', name_en: 'Sports', slug: 'sports', order_index: 11 },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'পবিত্র নগরী মদিনায় ড্রোন হামলায় বাংলাদেশের তীব্র নিন্দা',
    slug: 'bangladesh-condemns-drone-attack-in-holy-city-of-madinah-6ac1e0603474f',
    excerpt: 'পবিত্র নগরী মদিনায় সৌদি আরবের তাইবাহ বিদ্যুৎকেন্দ্রে হুথিদের ড্রোন হামলার তীব্র নিন্দা জানিয়েছে বাংলাদেশ। রোববার পররাষ্ট্র মন্ত্রণালয়ের এক বিবৃতিতে এ নিন্দা জানানো হয়।',
    content: `
      <p>পবিত্র নগরী মদিনায় সৌদি আরবের তাইবাহ বিদ্যুৎকেন্দ্রে হুথিদের ড্রোন হামলার তীব্র নিন্দা জানিয়েছে বাংলাদেশ। পররাষ্ট্র মন্ত্রণালয়ের এক প্রেস বিজ্ঞপ্তিতে এ তথ্য জানানো হয়।</p>
      <p>বিবৃতিতে বলা হয়েছে, যেকোনো পবিত্র ধর্মীয় স্থান বা বেসামরিক অবকাঠামোতে এ ধরনের বর্বরোচিত হামলা আন্তর্জাতিক আইনের সুস্পষ্ট লঙ্ঘন। বাংলাদেশ এই হামলায় গভীর উদ্বেগ প্রকাশ করছে এবং ভ্রাতৃপ্রতিম সৌদি আরবের সার্বভৌমত্ব ও নিরাপত্তার প্রতি সংহতি প্রকাশ করছে।</p>
      <p>একই সাথে মধ্যপ্রাচ্যে টেকসই শান্তি প্রতিষ্ঠার স্বার্থে সংশ্লিষ্ট সকল পক্ষকে সংযম প্রদর্শনের আহ্বান জানিয়েছে বাংলাদেশ সরকার।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791090783_6ac1e05f9232d.jpg',
    category: { id: 'cat-5', name_bn: 'আন্তর্জাতিক', name_en: 'International', slug: 'international', order_index: 4 },
    is_lead: true,
    is_breaking: true,
    view_count: 5420,
    author_name: 'কূটনৈতিক প্রতিবেদক',
    status: 'published',
    tags: ['মদিনা', 'সৌদি আরব', 'পররাষ্ট্র মন্ত্রণালয়', 'ড্রোন হামলা'],
    published_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-2',
    title: '১৩৩৯ বিলাসবহুল গাড়ির তথ্য নেই আয়কর নথিতে, অনুসন্ধানে এনবিআর',
    slug: 'information-on-1339-luxury-cars-missing-from-income-tax-records-nbr-launches-investigation-6ac1defadffc0',
    excerpt: 'দেশে প্রায় ৫৪৮৯টি উচ্চমূল্যের বা বিলাসবহুল গাড়ি রয়েছে। এর মধ্যে ১৩৩৯টির বেশি গাড়ির তথ্য মালিকদের আয়কর নথিতে অপ্রদর্শিত রয়েছে। অনুসন্ধানে নেমেছে এনবিআর।',
    content: `
      <p>দেশে প্রায় ৫৪৮৯টি উচ্চমূল্যের বা বিলাসবহুল গাড়ি রয়েছে। এর মধ্যে ১৩৩৯টির বেশি গাড়ির কোনো তথ্য মালিকদের ব্যক্তিগত বা করপোরেট আয়কর নথিতে খুঁজে পাওয়া যায়নি।</p>
      <p>জাতীয় রাজস্ব বোর্ড (এনবিআর) এর সেন্ট্রাল ইন্টেলিজেন্স সেল (সিআইসি) ইতোমধ্যে বিআরটিএ-এর সাথে যৌথভাবে ডেটা যাচাই-বাছাই কার্যক্রম শুরু করেছে। প্রাথমিকভাবে দেখা গেছে, কর ফাঁকি দিয়ে বা বেনামে এসব গাড়ি নিবন্ধন করা হয়েছে। দোষীদের বিরুদ্ধে কঠোর আইনানুগ ব্যবস্থা ও জরিমানা ধার্য করা হবে।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791090426_6ac1defa4cb88.png',
    category: { id: 'cat-2', name_bn: 'বাংলাদেশ', name_en: 'Bangladesh', slug: 'bangladesh', order_index: 1 },
    is_lead: false,
    is_breaking: false,
    view_count: 4210,
    author_name: 'বিশেষ প্রতিনিধি',
    status: 'published',
    tags: ['এনবিআর', 'আয়কর', 'বিলাসবহুল গাড়ি', 'রাজস্ব'],
    published_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-3',
    title: 'মাল্টার দাম ৫২০ টাকা কেন, ব্যবসায়ীদের কাছে ব্যাখ্যা চাইলেন বাণিজ্য উপদেষ্টা',
    slug: 'why-is-malta-selling-at-tk-520-per-kg-minister-seeks-explanation-from-traders-6ac1e1226c97d',
    excerpt: 'বাজারে প্রতি কেজি মাল্টা ৫২০ টাকায় বিক্রি হচ্ছে কেন, সে বিষয়ে ফল আমদানিকারক ও পাইকারি ব্যবসায়ীদের কাছে বিস্তারিত ব্যাখ্যা চেয়েছেন বাণিজ্য মন্ত্রণালয়।',
    content: `
      <p>রাজধানীর পাইকারি ও খুচরা বাজারে অস্বাভাবিকভাবে বৃদ্ধি পেয়েছে ফলের দাম। বিশেষ করে প্রতি কেজি মাল্টা ৫০০ থেকে ৫২০ টাকায় বিক্রির পেছনের যুক্তি নিয়ে ব্যবসায়ীদের তলব করেছে বাণিজ্য মন্ত্রণালয়।</p>
      <p>আমদানি এলসি খোলা এবং বন্দর শুল্কের আনুপাতিক হিসাব বিবেচনা করলে এই দাম কোনোভাবেই গ্রহণযোগ্য নয় বলে সংশ্লিষ্ট কর্মকর্তারা মত প্রকাশ করেছেন। আগামী সপ্তাহ থেকে যৌথ বাজার অভিযান জোরদার করা হবে।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791090977_6ac1e121cdac4.jpg',
    category: { id: 'cat-3', name_bn: 'অর্থনীতি', name_en: 'Economy', slug: 'the-economy', order_index: 2 },
    is_lead: false,
    is_breaking: false,
    view_count: 3120,
    author_name: 'অর্থনীতি প্রতিবেদক',
    status: 'published',
    tags: ['বাণিজ্য', 'বাজারদর', 'অর্থনীতি', 'দ্রব্যমূল্য'],
    published_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-4',
    title: 'মেসির বিদায়ের আগে আর্জেন্টিনার গোলবন্যা, বুরকিনা ফাসোকে ৭-০ গোলে হারাল',
    slug: 'argentina-score-seven-past-burkina-faso-ahead-of-messis-farewell-6ac1e1ec0bb8f',
    excerpt: 'আন্তর্জাতিক প্রীতি ম্যাচে বুরকিনা ফাসোকে ৭-০ গোলে বিধ্বস্ত করেছে বর্তমান বিশ্বচ্যাম্পিয়ন আর্জেন্টিনা। ম্যাচে জোড়া গোল করেন অধিনায়ক লিওনেল মেসি।',
    content: `
      <p>বুয়েনস এইরেসের মনুমেন্তালে অনুষ্ঠিত আন্তর্জাতিক প্রীতি ম্যাচে বুরকিনা ফাসোকে ৭-০ গোলে উড়িয়ে দিয়েছে লিওনেল স্কালোনির শিষ্যরা। ম্যাচের শুরু থেকেই ছিল বিশ্বচ্যাম্পিয়নদের একচ্ছত্র আধিপত্য।</p>
      <p>অধিনায়ক লিওনেল মেসি প্রথমার্ধে দুটি দৃষ্টিনন্দন গোল করেন। এছাড়া লাউতারো মার্তিনেস করেন হ্যাটট্রিক এবং এনজো ফার্নান্দেস ও হুলিয়ান আলভারেস একটি করে গোল করেন। খেলা শেষে পুরো স্টেডিয়াম মেসি বন্দনায় মুখরিত হয়ে ওঠে।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791091179_6ac1e1eb6c94b.jpg',
    category: { id: 'cat-12', name_bn: 'খেলা', name_en: 'Sports', slug: 'sports', order_index: 11 },
    is_lead: false,
    is_breaking: false,
    view_count: 6780,
    author_name: 'খেলাধুলো ডেস্ক',
    status: 'published',
    tags: ['মেসি', 'আর্জেন্টিনা', 'ফুটবল', 'বিশ্বকাপ'],
    published_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-5',
    title: '৩০ বছর ধরে গাছ ছাঁটাই করে সংসার চালাচ্ছেন প্রতিবন্ধী কামাল',
    slug: 'for-30-years-physically-challenged-kamal-has-supported-his-family-by-pruning-trees-6ac1f14617e48',
    excerpt: 'শারীরিক প্রতিবন্ধকতা জয় করে গত তিন দশক ধরে গাছ ছাঁটাইয়ের কাজ করে জীবিকা নির্বাহ করছেন গাইবান্ধার কামাল হোসেন। তার এই আত্মবিশ্বাস মানুষের অনুপ্রেরণা।',
    content: `
      <p>এক পায়ে শারীরিক প্রতিবন্ধকতা থাকা সত্ত্বেও পিছু হটেননি গাইবান্ধার কামাল হোসেন। নিজের অদম্য ইচ্ছাশক্তি আর শারীরিক পরিশ্রমের মাধ্যমে গত ৩০ বছর ধরে গাছ ছাঁটাই ও পরিচর্যা করে আসছেন তিনি।</p>
      <p>কামাল হোসেন বলেন, "কারো কাছে সাহায্য চেয়ে হাত পাতা আমার পছন্দ নয়। আল্লাহ হাত-পা দিয়েছেন, পরিশ্রম করে খাওয়ার মতো আনন্দ আর কোথাও নেই।" তার পরিবারের তিন সন্তানের পড়াশোনার খরচও তিনি এই উপার্জনেই নির্বাহ করছেন।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791095109_6ac1f14579147.jpg',
    category: { id: 'cat-4', name_bn: 'সারাদেশ', name_en: 'Countrywide', slug: 'the-whole-country', order_index: 3 },
    is_lead: false,
    is_breaking: false,
    view_count: 2310,
    author_name: 'গাইবান্ধা প্রতিনিধি',
    status: 'published',
    tags: ['গাইবান্ধা', 'মানবতা', 'অনুপ্রেরণা', 'সারাদেশ'],
    published_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-6',
    title: 'আগামী জানুয়ারিতে নতুন বই ও প্রাথমিকে দেওয়া হবে ইউনিফর্ম: শিক্ষামন্ত্রী',
    slug: 'new-textbooks-in-january-uniforms-to-be-provided-to-primary-students-education-minister-6ac1e3dc90bf5',
    excerpt: 'শিক্ষাকে সর্বাত্মক প্রাধান্য দিয়ে সরকার বিদ্যমান শিক্ষাব্যবস্থা পুনর্গঠনে কাজ করছে বলে জানিয়েছেন শিক্ষামন্ত্রী। আগামী জানুয়ারিতে যথাসময়ে বই উৎসব হবে।',
    content: `
      <p>আসন্ন শিক্ষাবর্ষের শুরুতেই প্রতিটি শিক্ষার্থীর হাতে নতুন পাঠ্যপুস্তক পৌঁছে দেওয়া হবে বলে নিশ্চিত করেছেন শিক্ষামন্ত্রী। তিনি জানান, মুদ্রণ কার্যক্রম নির্ধারিত শিডিউলে এগিয়ে চলছে।</p>
      <p>এছাড়া প্রাথমিক স্তরের শিক্ষার্থীদের উপস্থিতি ও আনন্দঘন পরিবেশ বৃদ্ধির লক্ষ্যে নতুন ইউনিফর্ম সহায়তা সরাসরি অভিভাবকের মোবাইল ব্যাংকিং একাউন্টে পৌঁছে দেওয়ার কার্যকর উদ্যোগ গ্রহণ করা হয়েছে।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791091675_6ac1e3dbf1e8c.jpg',
    category: { id: 'cat-10', name_bn: 'বিশেষ প্রতিবেদন', name_en: 'Special Report', slug: 'special-report', order_index: 9 },
    is_lead: false,
    is_breaking: false,
    view_count: 3450,
    author_name: 'শিক্ষা প্রতিবেদক',
    status: 'published',
    tags: ['শিক্ষা', 'পাঠ্যবই', 'প্রাথমিক বিদ্যালয়', 'শিক্ষামন্ত্রী'],
    published_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-7',
    title: 'বঙ্গোপসাগরকে সামরিক হস্তক্ষেপমুক্ত রাখতে চায় বাংলাদেশ: আন্তর্জাতিক সেমিনার',
    slug: 'bangladesh-wants-bay-of-bengal-free-from-military-intervention-muniruzzaman-6ac1dff8d15ea',
    excerpt: 'বঙ্গোপসাগরের কৌশলগত নিরাপত্তা ও অর্থনৈতিক সমৃদ্ধির স্বার্থে এটিকে পরাশক্তির সংঘাতমুক্ত রাখার আহ্বান জানিয়েছেন বিশিষ্ট নিরাপত্তা বিশ্লেষকরা।',
    content: `
      <p>রাজধানীতে আয়োজিত এক উচ্চপর্যায়ের ভূ-রাজনৈতিক গোলটেবিল সংলাপে বিশেষজ্ঞরা মতামত প্রকাশ করেন যে, বঙ্গোপসাগর অঞ্চলে শান্তি ও নৌ-নিরাপত্তা নিশ্চিত করা বাংলাদেশের জাতীয় সার্বভৌমত্বের প্রধান ভিত্তি।</p>
      <p>সমুদ্র অর্থনীতির (Blue Economy) সম্ভাবনা কাজে লাগাতে আঞ্চলিক সহযোগিতা বৃদ্ধি এবং প্রতিবেশী দেশগুলোর সাথে বন্ধুত্বপূর্ণ সম্পর্ক বজায় রাখার ওপর জোর দেওয়া হয়েছে।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791090680_6ac1dff83e6a1.jpg',
    category: { id: 'cat-10', name_bn: 'বিশেষ প্রতিবেদন', name_en: 'Special Report', slug: 'special-report', order_index: 9 },
    is_lead: false,
    is_breaking: false,
    view_count: 1980,
    author_name: 'কূটনৈতিক রিপোর্টার',
    status: 'published',
    tags: ['বঙ্গোপসাগর', 'নিরাপত্তা', 'পররাষ্ট্র'],
    published_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-8',
    title: 'পরিবর্তনের সময়ে বাংলাদেশের অর্থনৈতিক সংস্কার ও সম্ভাবনা',
    slug: 'bangladesh-at-a-time-of-change-6ac1e68cb129d',
    excerpt: 'বর্তমান সংকট কাটিয়ে দেশের ব্যাংকিং খাত, মূল্যস্ফীতি নিয়ন্ত্রণ ও টেকসই উন্নয়নে প্রয়োজনীয় সাহসী পদক্ষেপ নেওয়ার এটাই সুবর্ণ সুযোগ।',
    content: `
      <p>একটি কার্যকর ও স্বচ্ছ অর্থনৈতিক ব্যবস্থা গড়ে তুলতে এখন কাঠামোগত সংস্কারের কোনো বিকল্প নেই। কেন্দ্রীয় ব্যাংকের সাম্প্রতিক গৃহীত নীতিগুলো মুদ্রাস্ফীতি নিয়ন্ত্রণে সহায়ক ভূমিকা রাখবে বলে মনে করছেন অর্থনীতিবিদরা।</p>
      <p>রপ্তানি বহুমুখীকরণ এবং রেমিট্যান্স প্রবাহকে বৈধ চ্যানেলে ধরে রাখতে প্রণোদনা কাঠামোর আধুনিকায়ন অত্যন্ত প্রাসঙ্গিক।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791092364_6ac1e68c1da65.png',
    category: { id: 'cat-8', name_bn: 'সম্পাদকীয়', name_en: 'Editorial', slug: 'editorial', order_index: 7 },
    is_lead: false,
    is_breaking: false,
    view_count: 2890,
    author_name: 'সম্পাদকীয় বিভাগ',
    status: 'published',
    tags: ['সম্পাদকীয়', 'অর্থনীতি', 'ব্যাংকিং'],
    published_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: 'art-9',
    title: 'রোনালদোর ক্যাম্প ছাড়ার এক দিনেই ইনস্টাগ্রাম হারাল ৫ লাখ অনুসারী',
    slug: 'portugal-instagram-account-loses-more-than-500000-followers-a-day-after-ronaldo-leaves-camp-6ac0959f2617c',
    excerpt: 'পর্তুগাল দলের ক্যাম্প ছেড়ে ক্রিশ্চিয়ানো রোনালদো চলে যাওয়ার পর সামাজিক মাধ্যমে শুরু হয়েছে তীব্র প্রতিক্রিয়া। অনুসারী সংখ্যায় বড় ধস।',
    content: `
      <p>জাতীয় দলের ক্যাম্প থেকে ক্রিশ্চিয়ানো রোনালদো বিদায় নেওয়ার মাত্র ২৪ ঘণ্টার ব্যবধানে পর্তুগাল জাতীয় ফুটবল দলের অফিসিয়াল ইনস্টাগ্রাম পেজ থেকে ৫ লাখেরও বেশি ফলোয়ার আনফলো করেছেন।</p>
      <p>সোশ্যাল মিডিয়া অ্যানালিটিক্স টুলগুলোর পরিসংখ্যানে এই তথ্য উঠে এসেছে। আধুনিক ফুটবলে কোনো নির্দিষ্ট খেলোয়াড়ের ব্যক্তিগত ব্র্যান্ড ভ্যালুর প্রভাবের এক অনন্য উদাহরণ এটি।</p>
    `,
    featured_image: 'https://banglarface.com/uploads/news/post_1791006110_6ac0959e855d8.jpg',
    category: { id: 'cat-12', name_bn: 'খেলা', name_en: 'Sports', slug: 'sports', order_index: 11 },
    is_lead: false,
    is_breaking: false,
    view_count: 8120,
    author_name: 'স্পোর্টস ডেস্ক',
    status: 'published',
    tags: ['রোনালদো', 'পর্তুগাল', 'ইনস্টাগ্রাম', 'ফুটবল'],
    published_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  }
];

export const BREAKING_TICKER_ITEMS = [
  'পবিত্র নগরী মদিনায় ড্রোন হামলায় বাংলাদেশের তীব্র নিন্দা',
  '১৩৩৯ বিলাসবহুল গাড়ির তথ্য নেই আয়কর নথিতে, অনুসন্ধানে এনবিআর',
  'মাল্টার দাম ৫২০ টাকা কেন, ব্যবসায়ীদের কাছে ব্যাখ্যা চাইলেন বাণিজ্য উপদেষ্টা',
  'মেসির বিদায়ের আগে আর্জেন্টিনার গোলবন্যা, বুরকিনা ফাসোকে ৭-০ গোলে হারাল',
  'আগামী জানুয়ারিতে নতুন বই ও প্রাথমিকে দেওয়া হবে ইউনিফর্ম',
];

export const MOST_READ_ARTICLES = [
  { rank: 1, title: 'সাদুল্লাপুরে সাবেক ইউপি চেয়ারম্যানের ওপর সন্ত্রাসী তাণ্ডব', category: 'বাংলাদেশ', time: '৩ ঘন্টা আগে', slug: 'information-on-1339-luxury-cars-missing-from-income-tax-records-nbr-launches-investigation-6ac1defadffc0' },
  { rank: 2, title: 'রোনালদোর ক্যাম্প ছাড়ার এক দিনেই ইনস্টাগ্রাম হারাল ৫ লাখ অনুসারী', category: 'খেলা', time: '১ দিন আগে', slug: 'portugal-instagram-account-loses-more-than-500000-followers-a-day-after-ronaldo-leaves-camp-6ac0959f2617c' },
  { rank: 3, title: 'পবিত্র নগরী মদিনায় ড্রোন হামলায় বাংলাদেশের তীব্র নিন্দা', category: 'আন্তর্জাতিক', time: '৪ ঘন্টা আগে', slug: 'bangladesh-condemns-drone-attack-in-holy-city-of-madinah-6ac1e0603474f' },
  { rank: 4, title: '১৩ দিনে ৯ জেলা পেরিয়ে যশোরে বাবা-ছেলে, একটাই দাবি সেতু', category: 'বাংলাদেশ', time: '১ দিন আগে', slug: 'for-30-years-physically-challenged-kamal-has-supported-his-family-by-pruning-trees-6ac1f14617e48' },
  { rank: 5, title: 'মাল্টার দাম ৫২০ টাকা কেন, ব্যবসায়ীদের কাছে ব্যাখ্যা তলব', category: 'অর্থনীতি', time: '৪ ঘন্টা আগে', slug: 'why-is-malta-selling-at-tk-520-per-kg-minister-seeks-explanation-from-traders-6ac1e1226c97d' },
  { rank: 6, title: 'আগামী জানুয়ারিতে নতুন বই ও প্রাথমিকে দেওয়া হবে ইউনিফর্ম', category: 'শিক্ষা', time: '৪ ঘন্টা আগে', slug: 'new-textbooks-in-january-uniforms-to-be-provided-to-primary-students-education-minister-6ac1e3dc90bf5' },
];
