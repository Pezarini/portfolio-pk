"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Icon } from "@/components/ui/icons";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { products, site, type Product } from "@/lib/content";

export function Products() {
  return (
    <section id="produtos" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Produtos & Cases"
          title={
            <>
              Soluções que construí, para
              <br className="hidden md:block" /> empresas e para o mercado.
            </>
          }
          action={
            <a
              href={site.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-accent-bright transition-colors hover:text-ink"
            >
              Ver todos os projetos
              <Icon.arrowUpRight
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          }
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((p) => (
            <motion.div key={p.name} variants={staggerItem} className="h-full">
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col p-5">
        <span className="label-mono text-faint">{product.category}</span>
        <h3 className="mt-2 inline-flex items-center gap-1.5 text-xl font-semibold tracking-tight text-ink">
          {product.name}
          <Icon.arrowUpRight
            width={16}
            height={16}
            className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-bright"
          />
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <ProjectMock product={product} />

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {product.tags.map((t) => (
            <Tag key={t} variant={product.accent ? "accent" : "default"}>
              {t}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}

/** A browser-window frame holding the product screenshot (or a placeholder). */
function ProjectMock({ product }: { product: Product }) {
  const host = product.localUrl
    ? product.localUrl.replace(/^https?:\/\//, "")
    : `${product.name.toLowerCase().replace(/\s+/g, "")}.app`;

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-line bg-bg/60">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="ml-1 flex-1 truncate rounded-md bg-white/[0.03] px-2.5 py-1 text-center font-mono text-[0.65rem] text-faint">
          {host}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-bg-elev">
        {/* Placeholder shimmer under the image */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 60%)",
          }}
        />
        {product.image && (
          <Image
            src={product.image}
            alt={`Captura de tela — ${product.name}`}
            fill
            sizes="(max-width: 768px) 90vw, 360px"
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}
