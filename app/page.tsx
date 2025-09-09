import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Target, TrendingUp, Users, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ScriptAffiliator</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Fitur
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Harga
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimoni
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Masuk
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90">
                  Mulai Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Star className="w-4 h-4 mr-2" />
              Platform #1 untuk Content Creator
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Generate Script Konten
              <span className="text-primary"> Affiliate Marketing</span>
              dalam Hitungan Detik
            </h1>

            <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
              Buat script konten yang engaging dan converting untuk semua platform media sosial. Tingkatkan penjualan
              affiliate Anda dengan AI yang powerful.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Coba Gratis Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Lihat Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Gratis 7 hari • Tidak perlu kartu kredit • Setup dalam 2 menit
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Fitur Lengkap untuk Affiliate Marketer</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk membuat konten affiliate yang converting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Script Generator</CardTitle>
                <CardDescription>
                  Generate script konten berkualitas tinggi untuk berbagai platform dalam hitungan detik
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi Platform</CardTitle>
                <CardDescription>
                  Optimasi konten untuk Instagram, TikTok, YouTube, Facebook, dan platform lainnya
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analytics & Tracking</CardTitle>
                <CardDescription>
                  Monitor performa konten dan tingkatkan conversion rate dengan data real-time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Template Library</CardTitle>
                <CardDescription>
                  Akses ribuan template konten yang sudah terbukti converting di berbagai niche
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Content Scheduler</CardTitle>
                <CardDescription>
                  Jadwalkan dan publikasikan konten otomatis ke semua platform media sosial
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>A/B Testing</CardTitle>
                <CardDescription>Test berbagai variasi konten untuk menemukan yang paling efektif</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Dipercaya oleh 10,000+ Content Creator</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Lihat bagaimana ScriptAffiliator membantu meningkatkan penjualan mereka
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "ScriptAffiliator mengubah cara saya membuat konten. Sekarang saya bisa generate script berkualitas
                  dalam hitungan menit, bukan jam!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-primary">AS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Andi Setiawan</p>
                    <p className="text-sm text-muted-foreground">Content Creator</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Conversion rate saya meningkat 300% setelah menggunakan ScriptAffiliator. ROI yang luar biasa!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-primary">SP</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sari Permata</p>
                    <p className="text-sm text-muted-foreground">Affiliate Marketer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Platform terbaik untuk content creator. Interface yang mudah digunakan dan hasil yang selalu
                  memuaskan."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-primary">RH</span>
                  </div>
                  <div>
                    <p className="font-semibold">Rizki Hakim</p>
                    <p className="text-sm text-muted-foreground">Digital Marketer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground text-balance mb-4">
            Siap Meningkatkan Penjualan Affiliate Anda?
          </h2>
          <p className="text-xl text-primary-foreground/80 text-pretty mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan content creator yang sudah merasakan peningkatan conversion rate hingga 300%
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Mulai Trial Gratis 7 Hari
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">ScriptAffiliator</span>
              </div>
              <p className="text-muted-foreground">
                Platform AI terdepan untuk generate script konten affiliate marketing
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produk</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Harga
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Template
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Karir
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Dukungan</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ScriptAffiliator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
