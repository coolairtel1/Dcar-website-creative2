"use client";

import { useState } from "react";
import Icon from "./Icon";
import { products } from "@/content/site";

function L({ children }: { children: React.ReactNode }) {
  return <span className="text-[12px] text-muted">{children}</span>;
}

// Demo: validates and confirms locally. Phase 3 wires a Server Action (email/CRM).
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col justify-center">
        <Icon name="check" size={40} />
        <p className="t-h1 mt-6">Cảm ơn quý khách</p>
        <p className="t-body mt-3 max-w-sm text-muted">Đội ngũ DCAR sẽ liên hệ lại trong thời gian sớm nhất.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-x-8 gap-y-7 md:grid-cols-2">
      <label className="md:col-span-2"><L>Tên công ty</L><input className="field" name="company" placeholder="Nhập tên công ty" /></label>
      <label><L>Họ và tên *</L><input className="field" name="name" required placeholder="Nhập họ và tên" /></label>
      <label><L>Số điện thoại *</L><input className="field" name="phone" type="tel" required pattern="[0-9 +]{9,15}" placeholder="Nhập số điện thoại" /></label>
      <label className="md:col-span-2"><L>Email</L><input className="field" name="email" type="email" placeholder="Nhập email" /></label>
      <label>
        <L>Số lượng xe dự kiến</L>
        <select className="field" name="quantity" defaultValue="">
          <option value="" disabled>Chọn số lượng xe</option>
          <option>1 xe</option><option>2 – 5 xe</option><option>6 – 10 xe</option><option>Trên 10 xe</option>
        </select>
      </label>
      <label>
        <L>Dòng xe quan tâm</L>
        <select className="field" name="model" defaultValue="">
          <option value="" disabled>Chọn dòng xe</option>
          {products.map((p) => <option key={p.slug}>{p.name}</option>)}
        </select>
      </label>
      <label className="md:col-span-2"><L>Nội dung yêu cầu</L><textarea className="field min-h-32 resize-none" name="message" placeholder="Vui lòng mô tả nhu cầu của bạn..." /></label>
      <div className="flex flex-col items-start gap-5 md:col-span-2">
        <button type="submit" className="btn btn-ink">Gửi yêu cầu</button>
        <p className="flex items-center gap-2 text-[12px] text-muted"><Icon name="lock" size={14} /> Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích tư vấn.</p>
      </div>
    </form>
  );
}
