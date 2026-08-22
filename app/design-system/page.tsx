import { TopNav } from "@/components/layout/top-nav";
import { Footer } from "@/components/layout/footer";
import { PageShell } from "@/components/layout/page-shell";
import { DealCard } from "@/components/deal-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { GlassCard, MetricCard, PanelCard } from "@/components/ui/card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";
import { FilterGroup } from "@/components/ui/filter-group";
import { DataTable } from "@/components/ui/data-table";
import { Sparkline } from "@/components/ui/sparkline";
import { Icon } from "@/components/ui/icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { PriceRange } from "@/components/ui/price-range";

const PRODUCT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkXIzomnU8xITB-Ry3V1ZyzmhuqoZiV5zAWriJekJqD64bu0TnEljkc9exzMsY4slDIvkxDhrFqQWSEGCRXFAVpj5Ijh5fm7eLN0Du419Y-OBJFi7Lbzbm3TlFew2WExADT3yg1z6dSI_oMfFGH-iVc9DU2Otyat2cm9lIrtiwlcFi4n95jXGCeMbGzoINNMXOPK823pBu22SRiytmMAYtc-H1CjqQSBF7fXCbjyANjZYdIl7J7_J";

const topQueries = [
  { query: "sony headphones xm5", vol: "12k" },
  { query: "airpods pro 2", vol: "8.5k" },
  { query: "macbook air m2 512gb", vol: "6.2k" },
  { query: "rtx 4070 ti", vol: "4.1k" },
];

const retailerBars = [
  { name: "Amazon", percent: 45, tone: "bg-primary" },
  { name: "Best Buy", percent: 25, tone: "bg-tertiary" },
  { name: "Walmart", percent: 15, tone: "bg-secondary-fixed-dim" },
  { name: "Target", percent: 15, tone: "bg-outline-variant" },
] as const;

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-label-md text-secondary uppercase tracking-wider mb-md">{children}</h2>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <TopNav showInlineSearch searchValue="Noise Cancelling Headphones" statusTone="synced" />
      <PageShell className="space-y-xl">
        <section>
          <SectionTitle>Search Experience</SectionTitle>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-xl">
              <h1 className="text-display-lg text-on-surface mb-md">Professional Grade Market Intelligence</h1>
              <p className="text-body-lg text-on-surface-variant">
                Discover the optimal product strategy. Input plain language queries to analyze thousands of data points instantly.
              </p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card p-lg flex flex-col gap-lg">
              <div className="relative w-full flex items-center">
                <Input
                  variant="hero"
                  leadingIcon="search"
                  placeholder="e.g., 'Best noise-cancelling headphones under $200'"
                  aria-label="Product search"
                  className="pr-32"
                />
                <div className="absolute right-sm z-10">
                  <Button>Mine Data</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-md items-center justify-center pt-md border-t border-outline-variant">
                <Toggle label="Deep Search" />
                <Toggle label="Global Sources" defaultChecked />
                <Toggle label="Price Tracking" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Metrics</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
            <MetricCard label="Total Searches" value="124,592" delta={{ text: "+12.5% vs last period", trend: "up" }} />
            <MetricCard label="Avg Deal Price" value="$245.50" delta={{ text: "-3.2% vs last period", trend: "down" }} />
            <MetricCard label="Active Retailers" value="48" delta={{ text: "0% vs last period", trend: "flat" }} />
            <MetricCard label="Conversion Rate" value="4.2%" delta={{ text: "+1.1% vs last period", trend: "up" }} />
          </div>
        </section>

        <section>
          <SectionTitle>Analytics</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
            <PanelCard
              title="Price Trend Over Time"
              className="md:col-span-8 flex flex-col min-h-[400px]"
              actions={
                <div className="flex gap-sm">
                  <span className="inline-flex items-center gap-xs text-label-sm text-on-surface-variant">
                    <span className="w-3 h-3 rounded-full bg-primary inline-block"></span> Avg Price
                  </span>
                  <span className="inline-flex items-center gap-xs text-label-sm text-on-surface-variant">
                    <span className="w-3 h-3 rounded-full bg-tertiary inline-block"></span> Lowest Price
                  </span>
                </div>
              }
            >
              <div className="flex-grow relative w-full h-full border-b border-l border-outline-variant mt-sm">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="border-t border-outline-variant w-full h-0"></div>
                  ))}
                </div>
                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,80 L20,60 L40,65 L60,40 L80,30 L100,45 L100,100 L0,100 Z" fill="rgba(37, 99, 235, 0.1)" />
                  <path d="M0,80 L20,60 L40,65 L60,40 L80,30 L100,45" fill="none" stroke="#2563eb" strokeLinejoin="round" strokeWidth={2} vectorEffect="non-scaling-stroke" />
                  <path d="M0,90 L20,70 L40,80 L60,50 L80,45 L100,60" fill="none" stroke="#46566c" strokeDasharray="4 4" strokeLinejoin="round" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              <div className="flex justify-between mt-sm text-label-sm text-on-surface-variant">
                <span>Oct 1</span>
                <span>Oct 8</span>
                <span>Oct 15</span>
                <span>Oct 22</span>
                <span>Oct 29</span>
              </div>
            </PanelCard>
            <div className="md:col-span-4 flex flex-col gap-md">
              <PanelCard title="Deals by Retailer">
                <div className="flex flex-col gap-sm mt-sm">
                  {retailerBars.map((bar) => (
                    <div key={bar.name}>
                      <div className="flex justify-between text-label-sm text-on-surface mb-xs">
                        <span>{bar.name}</span>
                        <span>{bar.percent}%</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className={`${bar.tone} h-2 rounded-full`} style={{ width: `${bar.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </PanelCard>
              <PanelCard title="Top Search Queries" className="flex-grow">
                <DataTable
                  columns={[
                    { key: "query", label: "Query" },
                    { key: "vol", label: "Vol", align: "right", accent: true },
                  ]}
                  rows={topQueries}
                />
              </PanelCard>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>My Searching</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
            <div className="lg:col-span-2 flex flex-col gap-md">
              <GlassCard className="border border-outline-variant rounded-lg p-md relative overflow-hidden hover:border-primary-container hover:border-2 transition-all">
                <div className="absolute top-0 right-0 p-sm">
                  <Badge variant="active" />
                </div>
                <div className="flex items-start justify-between mb-sm pr-16">
                  <div>
                    <h3 className="text-title-md text-on-surface">Enterprise SaaS Subscriptions</h3>
                    <p className="text-label-md text-on-surface-variant">Keywords: CRM, ERP, Cloud Storage</p>
                  </div>
                </div>
                <div className="flex gap-lg items-end mt-lg border-t border-outline-variant pt-md">
                  <div>
                    <span className="block text-label-sm text-secondary mb-1 uppercase tracking-wider">Deals Found</span>
                    <span className="text-headline-md text-on-surface">142</span>
                  </div>
                  <div>
                    <span className="block text-label-sm text-secondary mb-1 uppercase tracking-wider">Last Sync</span>
                    <span className="text-body-md text-on-surface-variant">2 mins ago</span>
                  </div>
                  <div className="flex-grow"></div>
                  <button type="button" className="text-primary text-label-md hover:underline flex items-center gap-1">
                    View Results <Icon name="arrow_forward" size={16} />
                  </button>
                </div>
              </GlassCard>
              <GlassCard className="border border-outline-variant rounded-lg p-md transition-all">
                <div className="flex justify-between items-start mb-sm">
                  <div>
                    <h3 className="text-title-md text-on-surface">Hardware Components Q3</h3>
                    <p className="text-label-md text-on-surface-variant">Keywords: GPUs, SSDs, Logic Boards</p>
                  </div>
                  <Badge variant="paused" />
                </div>
                <div className="flex gap-lg items-end mt-lg border-t border-outline-variant pt-md">
                  <div>
                    <span className="block text-label-sm text-secondary mb-1 uppercase tracking-wider">Deals Found</span>
                    <span className="text-headline-md text-on-surface">87</span>
                  </div>
                  <div>
                    <span className="block text-label-sm text-secondary mb-1 uppercase tracking-wider">Last Sync</span>
                    <span className="text-body-md text-on-surface-variant">Oct 12, 2023</span>
                  </div>
                  <div className="flex-grow"></div>
                  <button type="button" className="text-on-surface-variant text-label-md hover:text-primary transition-colors flex items-center gap-1">
                    Resume <Icon name="play_arrow" size={16} />
                  </button>
                </div>
              </GlassCard>
              <PanelCard title="Query Limits">
                <ProgressBar value={5} max={20} />
                <p className="text-label-sm text-on-surface-variant text-right mt-2">5 of 20 Active Queries</p>
              </PanelCard>
            </div>
            <PanelCard title="Filters" actions={<button type="button" className="text-primary text-label-md hover:underline">Reset</button>}>
              <FilterGroup title="Price Range">
                <PriceRange />
              </FilterGroup>
              <FilterGroup title="Retailer">
                <Checkbox label="TechMart" count={24} defaultChecked />
                <Checkbox label="AudioWorld" count={18} defaultChecked />
                <Checkbox label="MegaStore" count={9} />
              </FilterGroup>
              <FilterGroup title="Condition">
                <Checkbox label="New" defaultChecked />
                <Checkbox label="Refurbished" />
              </FilterGroup>
            </PanelCard>
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-lg">
            <div>
              <p className="text-label-md text-secondary mb-1">Showing 51 deals for</p>
              <h2 className="text-headline-md text-on-surface">&ldquo;Noise Cancelling Headphones&rdquo;</h2>
            </div>
            <div className="flex items-center gap-sm">
              <span className="text-label-md text-secondary">Sort by:</span>
              <Select options={["Ranked Value", "Price: Low to High", "Discount %"]} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
            <DealCard
              rank={1}
              merchant="TechMart Electronics"
              title="Sony WH-1000XM5 Wireless Noise-Canceling Headphones"
              imageUrl={PRODUCT_IMAGE}
              price="$298.00"
              originalPrice="$398.00"
              dropLabel="25% PRICE DROP"
              href="#"
            />
            <DealCard
              merchant="AudioWorld"
              title="Bose QuietComfort Ultra Headphones Spatial Audio"
              imageUrl={PRODUCT_IMAGE}
              price="$329.00"
              originalPrice="$429.00"
              dropLabel="23% PRICE DROP"
              href="#"
            />
            <DealCard
              rank={3}
              merchant="MegaStore"
              title="Apple AirPods Pro (2nd Generation) with MagSafe Case"
              imageUrl={PRODUCT_IMAGE}
              price="$199.00"
              originalPrice="$249.00"
              dropLabel="20% PRICE DROP"
              href="#"
            />
          </div>
        </section>

        <section className="flex items-center gap-md">
          <StatusIndicator tone="mining" />
          <StatusIndicator tone="synced" />
          <Sparkline points={[30, 45, 38, 52, 48, 64, 58]} />
          <Sparkline points={[10, 25, 18, 32]} area={false} />
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
