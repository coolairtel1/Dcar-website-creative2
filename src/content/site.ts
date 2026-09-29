// Content transcribed from REF/ wireframes. Images live in public/media.

export const media = {
  vanHero: { src: "/media/executive-van-hero.jpg", alt: "Xe DCAR đỗ trước tòa nhà văn phòng lúc hoàng hôn" },
  studioVan: { src: "/media/studio-van.png", alt: "Xe DCAR màu đen chụp trong studio" },
  studioVanCompact: { src: "/media/studio-van-compact.png", alt: "Xe DCAR phiên bản gọn chụp trong studio" },
  cabin: { src: "/media/executive-cabin.jpg", alt: "Khoang hành khách DCAR với ghế da thương gia" },
  material: { src: "/media/material-detail.jpg", alt: "Chi tiết da, gỗ và kim loại trong nội thất DCAR" },
} as const;

export type MediaItem = (typeof media)[keyof typeof media];

export const company = {
  name: "DCAR",
  tagline: "Giải pháp di chuyển cao cấp dành riêng cho doanh nghiệp",
  hotline: "0909 05 7949",
  email: "info@dcar.com.vn",
  supportEmail: "cskh01@dcar.com.vn",
  web: "dcar.com.vn",
  showrooms: [
    { name: "Showroom HCM", address: "112 Trần Hưng Đạo, Phường Bến Thành, TP. Hồ Chí Minh" },
    { name: "Showroom Hà Nội", address: "Lô D3 - D4, KCN Đài Tư, Số 386 Đường Nguyễn Văn Linh, Phường Phúc Lợi, Hà Nội" },
  ],
};

export const tel = `tel:${company.hotline.replace(/\s/g, "")}`;

export const nav = [
  { label: "Trang chủ", href: "/" },
  { label: "Khách hàng", href: "/khach-hang" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const heroSlides = [
  {
    tab: "Giải pháp di chuyển",
    eyebrow: "Dành riêng cho doanh nghiệp",
    title: "Giải pháp di chuyển cao cấp dành riêng cho doanh nghiệp",
    text: "DCAR mang đến những dòng xe limousine sang trọng, đẳng cấp, đáp ứng mọi hành trình công tác, đón tiếp và vận hành chuyên nghiệp của doanh nghiệp.",
    image: media.vanHero,
  },
  {
    tab: "Sản phẩm",
    eyebrow: "Nội thất thương gia",
    title: "Không gian riêng tư trên mọi hành trình",
    text: "Khoang hành khách được thiết kế riêng: ghế thương gia, ánh sáng ambient, cách âm hoàn hảo cho lãnh đạo và khách VIP.",
    image: media.cabin,
  },
  {
    tab: "Chế tác",
    eyebrow: "Thiết kế và sản xuất tại Việt Nam",
    title: "Chế tác tỉ mỉ đến từng chi tiết",
    text: "Da, gỗ và kim loại được lựa chọn và hoàn thiện thủ công tại nhà máy DCAR, mang đậm dấu ấn thương hiệu của bạn.",
    image: media.material,
  },
];

export const about = {
  title: "Về DCAR",
  text: "Với hơn 17 năm kinh nghiệm trong lĩnh vực sản xuất, nâng cấp, cải tiến xe limousine cao cấp, Dcar luôn tiên phong mang đến những sản phẩm xứng tầm, thiết kế riêng cùng các giải pháp vận hành tối ưu cho doanh nghiệp.",
  points: ["Thiết kế và sản xuất tại Việt Nam", "Cam kết chất lượng & dịch vụ chuyên nghiệp", "Chất lượng - Đẳng cấp - Khác biệt"],
};

export const solutions = [
  { icon: "user", title: "Lãnh đạo & Executive", text: "Di chuyển riêng tư, tiện nghi đẳng cấp" },
  { icon: "vip", title: "Đón tiếp khách hàng/VIP", text: "Tạo ấn tượng với đối tác và khách hàng" },
  { icon: "users", title: "Đưa đón nhân sự", text: "An toàn, đúng giờ, tiết kiệm chi phí" },
  { icon: "building", title: "Hotel/Resorts & Hospitality", text: "Dịch vụ chuyên nghiệp nâng tầm trải nghiệm" },
  { icon: "pin", title: "Khai đoàn tour cao cấp", text: "Nâng tầm hành trình cho tour cao cấp" },
  { icon: "doc", title: "Sự kiện & MICE", text: "Vận chuyển đoàn linh hoạt, hiệu quả" },
] as const;

export const reasons = [
  { icon: "office", title: "Chuyên biệt cho doanh nghiệp" },
  { icon: "wand", title: "Thiết kế và sản xuất tại Dcar" },
  { icon: "diamond", title: "Cá nhân hóa theo thương hiệu" },
  { icon: "gear", title: "Sẵn sàng đáp ứng mọi nhu cầu" },
  { icon: "tools", title: "Hệ thống bảo hành và bảo trì toàn quốc" },
] as const;

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  text: string;
  short: string;
  image: MediaItem;
  overview: string;
  exterior: string;
  interior: string;
  features: string[];
  specs: [string, string][];
  uses: string[];
};

const baseSpecs: [string, string][] = [
  ["Kích thước tổng thể", "5998 × 2098 × 2760 mm"],
  ["Số chỗ ngồi", "10 chỗ"],
  ["Động cơ", "Ford Transit 2.0L / Hyundai Solati 2.5L"],
  ["Hộp số", "Tự động 10 cấp / 6 cấp"],
  ["Hệ thống treo", "Khí nén"],
  ["Tiêu chuẩn khí thải", "Euro 5"],
];

const baseFeatures = [
  "Ghế thương gia có chức năng massage, sưởi và làm mát",
  "Hệ thống giải trí cao cấp với màn hình lớn",
  "Cách âm hoàn hảo",
  "Hệ thống ánh sáng Ambient",
  "Tủ lạnh, bàn làm việc, sạc không dây",
];

export const products: Product[] = [
  {
    slug: "president",
    name: "DCAR President",
    tagline: "Đỉnh cao của sự riêng tư & đẳng cấp",
    text: "Dành riêng cho lãnh đạo trong hành trình tiện nghi tuyệt đối và tôn vinh đẳng cấp.",
    short: "Đỉnh cao sự sang trọng và tiện nghi",
    image: media.vanHero,
    overview: "DCAR President là dòng xe limousine cao cấp nhất của DCAR, được thiết kế dành riêng cho giới doanh nhân thành đạt. Mỗi chi tiết đều được chăm chút tỉ mỉ, mang đến sự thoải mái, tiện nghi và đẳng cấp vượt trội.",
    exterior: "Thiết kế hiện đại, mạnh mẽ và sang trọng. Đường nét tinh tế, khẳng định đẳng cấp.",
    interior: "Khoang hành khách bọc da cao cấp, ốp gỗ và kim loại xước, ánh sáng ambient dịu nhẹ.",
    features: baseFeatures,
    specs: baseSpecs,
    uses: ["Đưa đón lãnh đạo cấp cao", "Đón tiếp đối tác chiến lược", "Hội nghị, sự kiện quan trọng"],
  },
  {
    slug: "vip-lounge",
    name: "DCAR VIP Lounge",
    tagline: "Your private lounge",
    text: "Không gian riêng tư di động đẳng cấp, trải nghiệm thư thái trên mọi hành trình.",
    short: "Phòng chờ VIP di động",
    image: media.studioVan,
    overview: "DCAR VIP Lounge biến khoang xe thành một phòng chờ riêng: ghế ngả sâu, bàn làm việc, minibar và hệ thống giải trí cho những hành trình dài.",
    exterior: "Thân xe dài, kính tối màu riêng tư, lưới tản nhiệt mạ crôm tinh tế.",
    interior: "Bố trí lounge với ghế đối diện, bàn gập và tủ lạnh tích hợp.",
    features: baseFeatures,
    specs: baseSpecs,
    uses: ["Đón tiếp khách VIP", "Hành trình liên tỉnh", "Họp di động"],
  },
  {
    slug: "thuong-dinh",
    name: "DCAR Thượng Đỉnh",
    tagline: "Sang trọng – Bền bỉ – Đẳng cấp",
    text: "Sự kết hợp hoàn hảo giữa đẳng cấp và hiệu năng, phù hợp cho những chuyến đi đa dụng.",
    short: "Đẳng cấp và hiệu năng",
    image: media.studioVanCompact,
    overview: "DCAR Thượng Đỉnh cân bằng giữa sự sang trọng và tính đa dụng, phù hợp cho doanh nghiệp cần một chiếc xe bền bỉ cho nhiều mục đích.",
    exterior: "Kiểu dáng gọn gàng, dễ xoay trở trong đô thị mà vẫn giữ vẻ bề thế.",
    interior: "Ghế da cao cấp, sàn gỗ, cổng sạc tại mọi vị trí.",
    features: baseFeatures,
    specs: baseSpecs,
    uses: ["Đưa đón nhân sự cấp quản lý", "Tour cao cấp", "Sự kiện & MICE"],
  },
  {
    slug: "thuong-gia",
    name: "DCAR Thương Gia",
    tagline: "Tinh tế nội thất – Hiện đại – Hiệu quả",
    text: "Giải pháp tối ưu cho các doanh nhân bận rộn và yêu thích doanh nghiệp.",
    short: "Tinh tế và hiệu quả",
    image: media.cabin,
    overview: "DCAR Thương Gia tập trung vào trải nghiệm làm việc trên đường: không gian yên tĩnh, kết nối đầy đủ và nội thất tinh tế.",
    exterior: "Ngoại thất thanh lịch, phù hợp hình ảnh doanh nghiệp.",
    interior: "Ghế thương gia chỉnh điện, bàn làm việc gập, sạc không dây.",
    features: baseFeatures,
    specs: baseSpecs,
    uses: ["Công tác hằng ngày", "Đưa đón khách hàng", "Hotel & Resort"],
  },
];

export const productUsps = [
  { icon: "lock", title: "Không gian riêng tư tuyệt đối" },
  { icon: "diamond", title: "Nội thất xa hoa sang trọng" },
  { icon: "spark", title: "Tiện nghi hiện đại" },
  { icon: "shield", title: "An toàn tuyệt đối" },
  { icon: "user", title: "Cá nhân hóa theo yêu cầu" },
  { icon: "star", title: "Đẳng cấp khác biệt" },
] as const;

// Client names as given in REF (CLIENT.png); logo slots are placeholders until real logos arrive.
export const partners = ["Bắc Ninh FC", "FLC Group", "VIN Group"];

const showcaseImages = [media.vanHero, media.cabin, media.studioVan, media.material, media.studioVanCompact, media.cabin, media.vanHero, media.material, media.studioVan];
const showcaseRows = [
  { client: "Bắc Ninh FC", model: "President" },
  { client: "FLC Group", model: "Thương Gia" },
  { client: "VIN Group", model: "President" },
];
export const clientShowcase = showcaseImages.map((image, i) => ({ ...showcaseRows[i % 3], image }));

export const contact = {
  values: [
    { icon: "phone", title: "Tư vấn tận tâm", text: "Hiểu rõ nhu cầu của doanh nghiệp" },
    { icon: "clock", title: "Phản hồi nhanh chóng", text: "Hỗ trợ trong thời gian sớm nhất" },
    { icon: "coin", title: "Giải pháp tối ưu", text: "Đáp ứng linh hoạt mọi yêu cầu" },
  ],
  blocks: [
    { icon: "phone", title: "Hotline", lines: [company.hotline, "Thời gian hoạt động: 8:00 - 20:00", "(Thứ 2 - Chủ nhật)"] },
    { icon: "mail", title: "Email", lines: [company.supportEmail] },
    { icon: "office", title: "Showroom HCM", lines: [company.showrooms[0].address, "Thời gian: 8:00 - 18:00 (Thứ 2 - Chủ nhật)"] },
    { icon: "office", title: "Showroom Hà Nội", lines: [company.showrooms[1].address, "Thời gian: 8:00 - 18:00 (Thứ 2 - Chủ nhật)"] },
    { icon: "factory", title: "Nhà máy", lines: ["Lô D5, Đường số 1, KCN Hiệp Phước, Xã Hiệp Phước, TP. Hồ Chí Minh", "Thời gian: 8:00 - 17:00 (Thứ 2 - Thứ 7)"] },
  ],
  pillars: [
    { icon: "shield", title: "Sản phẩm chính hãng", text: "Chất lượng tiêu chuẩn quốc tế, độ bền vượt trội." },
    { icon: "gear", title: "Dịch vụ chuyên nghiệp", text: "Hỗ trợ tận tâm 24/7, đồng hành cùng doanh nghiệp." },
    { icon: "tools", title: "Bảo hành uy tín", text: "Bảo hành chính hãng toàn quốc, an tâm trên mọi hành trình." },
  ],
  mapQuery: "112 Trần Hưng Đạo, Phường Bến Thành, TP. Hồ Chí Minh",
};

export const cta = {
  title: "Cùng DCAR kiến tạo trải nghiệm di chuyển đẳng cấp cho doanh nghiệp của bạn",
  text: "Liên hệ ngay để được tư vấn giải pháp phù hợp",
};
