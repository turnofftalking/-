/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  BookOpen, 
  Instagram, 
  ExternalLink, 
  Heart, 
  ChevronRight,
  Lamp,
  Coffee,
  PenTool,
  Smile,
  X,
  Stamp,
  Gift,
  Send,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Truck,
  Sparkles,
  Users,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export default function App() {
  const [isLampOn, setIsLampOn] = useState(true);
  const [isSofaClicked, setIsSofaClicked] = useState(false);
  const [showEntryPopup, setShowEntryPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<'annual' | 'trial'>('annual');
  const [checkoutStep, setCheckoutStep] = useState<'experience' | 'checkout' | 'success'>('experience');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const productsRef = useRef<HTMLElement>(null);

  const isFormValid = formData.name.trim() !== '' && formData.phone.trim() !== '' && formData.address.trim() !== '';

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntryPopup(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      id: 'story',
      title: '郵箱故事體驗',
      icon: <BookOpen className="w-6 h-6 text-coffee-dark" />,
      description: '24封手寫信，敘說一個溫暖與成長的故事。',
      details: '每月寄送兩封，持續12個月，陪伴你或你想守護的人走過這一年。',
      surprises: [
        '關燈之後/燈下嘿原創明信片',
        '與愛跟守護有關的小禮物'
      ],
      priceYear: 'NT$ 3,600 / 年',
      priceMonth: '試讀：NT$ 360 / 月',
      cta: '開始體驗',
      tip: '每個月給自己一個小時，躲進故事裡，那是屬於你的秘密基地。',
      image: 'https://picsum.photos/seed/letter/800/600',
      experienceText: '這是一場為期一年的文字旅程。每個月，你都會收到兩封來自燈燈的手寫信，裡面裝載著關於成長、勇氣與溫暖的故事。這些文字將陪伴你度過每個安靜的夜晚，成為你心靈的避風港。',
      heartText: '我始終相信，文字是有溫度的。在快節奏的世界裡，我希望透過慢下來的手寫信，與你分享那些在荒原中撿拾到的光亮。這不只是一份訂閱，更是我們之間無聲的對話。',
      benefitText: '你將學會如何溫柔地對待自己，在文字的流淌中找回平靜。每個月的兩次相遇，都是一次心靈的深呼吸，讓你更有力量面對日常的瑣碎。',
      giftText: '如果你身邊也有一個正在努力生活、卻偶爾感到疲憊的朋友，這份禮物會是最好的擁抱。讓我們一起，成為彼此生命中那盞不滅的燈。',
      contentImages: [
        'https://picsum.photos/seed/story1/400/300',
        'https://picsum.photos/seed/story2/400/300',
        'https://picsum.photos/seed/story3/400/300'
      ],
      checkoutDetails: '訂閱後，請務必填寫正確的收件地址。我們將在每月的 1 號與 15 號透過中華郵政為你寄出這份溫暖。務必填寫正確地址才收得到喔！'
    },
    {
      id: 'greeting',
      title: '來自朋友的手寫問候',
      icon: <Mail className="w-6 h-6 text-coffee-dark" />,
      description: '每月一封像朋友從遠方寄來的信件。',
      details: '關於所見所聞的分享及親切的問候。',
      surprises: [
        '每月香氛小卡',
        '隨機掉落關於朋友的親暱小禮物'
      ],
      priceYear: 'NT$ 2,500 / 年',
      priceMonth: '試閱：NT$ 250 / 月',
      cta: '開始陪伴',
      tip: '有時候，我們需要的不是建議，只是一句「我也在」。',
      image: 'https://picsum.photos/seed/friend/800/600',
      experienceText: '就像遠方老友的叮嚀。每個月一封信，附上一張特製的香氛小卡，讓文字的溫度伴隨著香氣，輕輕喚醒你對生活的感知。這不只是信件，更是一份跨越距離的陪伴。',
      heartText: '我想成為那個在遠方為你加油的朋友。不需要華麗的辭藻，只要真誠的問候。透過香氛與文字，我想把生活中的微小美好，親手遞交到你手上。',
      benefitText: '在打開信封的那一刻，你會聞到淡淡的香氣，感受到有人正在遠方掛念著你。這種被記住的感覺，能讓平凡的日子變得閃閃發亮。',
      giftText: '這是一份最適合送給遠方好友的驚喜。讓這份香氣與文字，代替你陪伴在他們身邊，告訴他們：無論在哪裡，你都在。',
      contentImages: [
        'https://picsum.photos/seed/friend1/400/300',
        'https://picsum.photos/seed/friend2/400/300',
        'https://picsum.photos/seed/friend3/400/300'
      ],
      checkoutDetails: '本方案包含實體信件與香氛小卡。將由中華郵政寄送，請務必填寫正確收件地址才收得到溫暖呦！'
    },
    {
      id: 'bundle',
      title: '合購溫暖方案',
      icon: <Heart className="w-6 h-6 text-lotus-pink" />,
      description: '最受歡迎的陪伴方式。',
      details: '包含：郵箱故事體驗 + 朋友的手寫問候。年訂閱加碼：所有實體驚喜與守護禮物。',
      surprises: [
        '郵箱故事體驗所有內容',
        '朋友的手寫問候所有內容',
        '實體驚喜與守護禮物'
      ],
      priceYear: 'NT$ 5,200 / 年',
      priceMonth: 'NT$ 520 / 月',
      cta: '立即開啟陪伴',
      tip: '把這份完整的溫暖收進心底。讓我們在每個安靜的時刻，都能感受到彼此支持的力量，一起看見生命中那些本就存在的恩賜。',
      image: 'https://picsum.photos/seed/warmth/800/600',
      experienceText: '最完整的守護。結合了故事的深度與朋友的問候，再加上年訂閱專屬的實體驚喜禮物。這份方案是為了想給自己最完整陪伴的你而設計的。',
      heartText: '這是燈燈能給出的最完整的愛。我不僅想陪你讀故事，更想陪你過生活。合購方案是為了那些渴望全方位療癒的朋友所準備的，包含了所有的心意與驚喜。',
      benefitText: '你將獲得最完整的療癒體驗。從故事的啟發到日常的問候，再加上不定期掉落的實體驚喜，讓你的生活被溫暖層層包裹，不再感到孤單。',
      giftText: '如果你想給最重要的人一份年度守護，這就是唯一的選擇。這不只是一份禮物，更是一整年的守護承諾，讓對方知道你的愛無處不在。',
      contentImages: [
        'https://picsum.photos/seed/bundle1/400/300',
        'https://picsum.photos/seed/bundle2/400/300',
        'https://picsum.photos/seed/bundle3/400/300'
      ],
      checkoutDetails: '合購方案將同時享有兩項服務的所有內容。將由中華郵政寄送，請務必填寫正確收件地址才收得到溫暖呦！'
    }
  ];

  const handleStartExperience = (product: any) => {
    setSelectedProduct(product);
    setCheckoutStep('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCheckout = () => {
    // We already moved the checkout form to the bottom of the experience page
    const checkoutElement = document.getElementById('checkout-form');
    if (checkoutElement) {
      checkoutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen selection:bg-lotus-pink/30 selection:text-coffee-dark overflow-x-hidden">
      {/* Entry Popup */}
      <Dialog open={showEntryPopup} onOpenChange={setShowEntryPopup}>
        <DialogContent className="rounded-[2.5rem] bg-cream border-lotus-pink/20 max-w-md p-8 overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-lotus-pink/10 rounded-full blur-2xl" />
          <div className="relative z-10 text-center space-y-6">
            <div className="w-20 h-20 bg-lotus-pink/20 rounded-2xl flex items-center justify-center mx-auto rotate-6">
              <Stamp className="w-10 h-10 text-lotus-pink" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-coffee-dark">你得到了一個守護折扣</h3>
              <p className="text-coffee-light font-serif italic">
                「如果現在能給過去的自己一個擁抱，你會想對他說什麼？」
              </p>
            </div>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="留下你的 Email，讓溫暖傳遞..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-lotus-pink/20 focus:border-lotus-pink outline-none transition-all bg-white/50"
              />
              <Button 
                onClick={() => setShowEntryPopup(false)}
                className="w-full h-12 bg-lotus-pink hover:bg-lotus-pink/90 text-white rounded-xl font-bold flex items-center justify-center gap-2"
              >
                領取溫暖 <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-coffee-light/40 uppercase tracking-widest">守護你的每一刻安靜</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section - Cafe Atmosphere */}
      <section className={`relative h-screen flex items-center justify-center transition-colors duration-1000 ${isLampOn ? 'cafe-glow' : 'bg-coffee-dark/90'}`}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-lotus-pink rounded-full blur-[100px]" 
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="flex justify-center gap-12 mb-12">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLampOn(!isLampOn)}
              className={`cursor-pointer p-6 rounded-full transition-all duration-500 ${isLampOn ? 'bg-warm-yellow lamp-light' : 'bg-coffee-light/20'}`}
            >
              <Lamp className={`w-12 h-12 ${isLampOn ? 'text-coffee-dark' : 'text-warm-yellow/50'}`} />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSofaClicked(true)}
              className={`cursor-pointer p-6 rounded-full transition-all duration-500 bg-white/40 hover:bg-white/60`}
            >
              <Coffee className="w-12 h-12 text-coffee-dark" />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-6"
          >
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter transition-colors duration-700 ${isLampOn ? 'text-coffee-dark' : 'text-warm-yellow'}`}>
              關燈之後
            </h1>
            <p className={`text-xl md:text-2xl font-serif italic transition-colors duration-700 ${isLampOn ? 'text-coffee-light' : 'text-warm-yellow/70'}`}>
              親密朋友的溫暖問候
            </p>
            <div className="pt-8">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-px h-16 mx-auto ${isLampOn ? 'bg-coffee-dark/20' : 'bg-warm-yellow/20'}`}
              />
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isSofaClicked && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-coffee-dark/40 backdrop-blur-sm"
              onClick={() => setIsSofaClicked(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-cream p-8 rounded-[2rem] max-w-sm text-center space-y-4 warm-shadow stamp-border"
                onClick={(e) => e.stopPropagation()}
              >
                <Smile className="w-12 h-12 text-lotus-pink mx-auto" />
                <h3 className="text-2xl font-bold">你坐下來了呀</h3>
                <p className="text-coffee-light leading-relaxed">
                  燈燈幫你留了這個位置很久了。<br />
                  在這裡，你可以卸下所有的防備，<br />
                  我們只聊那些讓心裡暖暖的小事。
                </p>
                <Button onClick={() => setIsSofaClicked(false)} className="bg-lotus-pink hover:bg-lotus-pink/80 text-white rounded-full px-8">
                  好喔，燈燈
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Introduction Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center space-y-12"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-lotus-pink/10 rounded-full blur-xl animate-pulse" />
            <PenTool className="w-12 h-12 text-lotus-pink relative z-10" />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-coffee-dark">嘿，我是燈燈。</h2>
            <div className="space-y-6 text-lg md:text-xl text-coffee-light leading-relaxed handwritten-feel">
              <p>
                歡迎來到這個小空間。這裡沒有標準答案，只有真摯的陪伴。<br />
                我喜歡手寫的溫度，喜歡收到手寫信件時湧上心頭的感動。<br />
                更喜歡在安靜的深夜，把那些說不出口的愛和情感化作文字，<br />
                傳遞到我親愛的朋友手上。
              </p>
              <p className="text-coffee-dark font-medium italic">
                「摯愛的好朋友，讓我們一起慢慢練習感受生活。」
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Letter to Friends Section */}
      <section className="py-32 bg-lotus-pink/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <Mail className="w-64 h-64" />
        </div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto px-6"
        >
          <div className="bg-white p-12 md:p-20 rounded-[3rem] warm-shadow stamp-border relative">
            <div className="absolute top-8 right-12 opacity-20">
              <Stamp className="w-16 h-16 text-lotus-pink" />
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark mb-12 flex items-center gap-3">
              <Heart className="w-6 h-6 text-lotus-pink" />
              致我親愛的朋友：
            </h3>
            <div className="space-y-8 text-lg text-coffee-light leading-relaxed font-serif italic">
              <p>
                我曾經獨自在自己的荒原裡走了很久，久到忘記怎麼支持自己，甚至連微小的選擇都感到沉重。
              </p>
              <p>
                後來我才發現，真正的強大不是不倒下，<br />
                而是能夠支撐自己，在廢墟上重新蓋起一棟屬於自己的房子。
              </p>
              <p>
                手寫信是我想實現與世界正向回饋的方式之一，也是我想拉著每個朋友的手，在黑暗中尋找光的方式。
              </p>
              <p>
                在這裡，沒有大道理，只有我們如何感受自己、拿回人生主宰權的真實引路。
              </p>
              <p>
                你將不僅僅是聽眾，我希望這封溫暖的「信」能讓你感受到，有人正在支持你的每一個決定。
              </p>
              <p>
                關燈之後，我們不必再演給誰看，只是安靜地陪伴著永恆，支持永恆成就自己，看見那些本就存在的恩賜。
              </p>
            </div>
            <div className="mt-16 text-right">
              <p className="text-coffee-dark font-bold tracking-widest">—— 燈燈</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="py-32 bg-warm-yellow/10 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full bg-white border-none rounded-[2.5rem] warm-shadow overflow-hidden transition-all duration-500">
                  <div className="p-8 space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-coffee-dark/5 flex items-center justify-center group-hover:rotate-6 transition-all duration-500">
                      {product.icon}
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-coffee-dark">{product.title}</CardTitle>
                      <CardDescription className="text-coffee-light/80 text-sm">{product.description}</CardDescription>
                    </div>
                    <p className="text-coffee-light leading-relaxed text-sm h-12 overflow-hidden">
                      {product.details}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-coffee-dark font-bold text-sm">
                        <Gift className="w-4 h-4 text-lotus-pink" />
                        <span>包含驚喜：</span>
                      </div>
                      <ul className="space-y-1">
                        {product.surprises.slice(0, 2).map((surprise, idx) => (
                          <li key={idx} className="text-xs text-coffee-light flex items-center gap-2">
                            <div className="w-1 h-1 bg-lotus-pink rounded-full" />
                            {surprise}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-coffee-dark/5 space-y-1">
                      <div className="text-xl font-bold text-coffee-dark">{product.priceYear}</div>
                      <div className="text-sm text-lotus-pink font-medium">{product.priceMonth}</div>
                    </div>

                    <Button 
                      onClick={() => handleStartExperience(product)}
                      className={`w-full h-12 rounded-xl font-bold transition-all ${product.id === 'bundle' ? 'bg-lotus-pink hover:bg-lotus-pink/90 text-white' : 'bg-coffee-dark hover:bg-coffee-dark/90 text-white'}`}
                    >
                      {product.cta}
                    </Button>
                  </div>
                  <CardFooter className="px-8 pb-8">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full h-12 rounded-xl border-2 border-lotus-pink/30 text-lotus-pink hover:bg-lotus-pink hover:text-white transition-all font-bold text-sm">
                          燈燈想對你說
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2.5rem] bg-cream border-lotus-pink/20">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-coffee-dark">
                            <Heart className="w-5 h-5 text-lotus-pink" />
                            親愛的朋友
                          </DialogTitle>
                          <DialogDescription className="text-lg pt-6 text-coffee-light italic leading-relaxed font-serif">
                            {product.tip}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Section & Footer Combined */}
      <section className="relative py-32 px-6 overflow-hidden bg-cream">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-lotus-pink/5 to-transparent" />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto space-y-20 relative z-10"
        >
          <div className="text-center space-y-8">
            <p className="text-sm font-medium text-coffee-light/60 tracking-widest uppercase">
              燈燈想跟你確認一件事
            </p>
            <motion.h3 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl md:text-5xl font-bold text-coffee-dark leading-tight"
            >
              你準備好要跟我一起守護自己了嗎？
            </motion.h3>
            
            <div className="pt-8">
              <Button 
                onClick={scrollToProducts}
                className="rounded-full px-16 h-16 bg-lotus-pink text-white hover:bg-lotus-pink/90 transition-all font-bold text-xl shadow-xl hover:scale-105 transform"
              >
                好
              </Button>
            </div>
          </div>

          <div className="pt-20 border-t border-coffee-dark/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left space-y-2">
              <h4 className="text-2xl font-bold text-coffee-dark tracking-widest">關燈之後</h4>
              <p className="text-sm text-coffee-light/60 font-medium">由 燈燈 溫暖製作</p>
              <p className="text-xs text-coffee-light/40 italic">「晚安，親愛的朋友。」</p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8">
              <a 
                href="https://vocus.cc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-coffee-light hover:text-lotus-pink transition-all group"
              >
                <div className="p-2 rounded-lg bg-coffee-dark/5 group-hover:bg-lotus-pink/10 transition-all">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold tracking-wide">Vocus 方格子</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-coffee-light hover:text-lotus-pink transition-all group"
              >
                <div className="p-2 rounded-lg bg-coffee-dark/5 group-hover:bg-lotus-pink/10 transition-all">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold tracking-wide">Instagram</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-coffee-light/30 uppercase tracking-[0.2em]">© 2026 關燈之後 . All rights reserved.</p>
          </div>
        </motion.div>
      </section>

      {/* Experience & Checkout View */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-cream overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-12">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-coffee-light hover:text-coffee-dark transition-colors mb-12 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                返回空間
              </button>

              {checkoutStep !== 'success' && (
                <div className="space-y-24">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                  >
                    <div className="aspect-video rounded-[3rem] overflow-hidden warm-shadow relative">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/40 to-transparent" />
                      <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="text-4xl font-bold">{selectedProduct.title}</h2>
                      </div>
                    </div>

                    <div className="space-y-12">
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-lotus-pink" />
                            體驗內容
                          </h3>
                          <p className="text-lg text-coffee-light leading-relaxed font-serif italic">
                            {selectedProduct.experienceText}
                          </p>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-white warm-shadow space-y-4">
                          <h3 className="text-xl font-bold text-coffee-dark flex items-center gap-2">
                            <Gift className="w-5 h-5 text-lotus-pink" />
                            包含的驚喜
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedProduct.surprises.map((s: string, i: number) => (
                              <li key={i} className="flex items-center gap-3 text-coffee-light">
                                <CheckCircle2 className="w-5 h-5 text-lotus-pink shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-2">
                            <Heart className="w-6 h-6 text-lotus-pink" />
                            燈燈的心意
                          </h3>
                          <p className="text-lg text-coffee-light leading-relaxed font-serif italic">
                            {selectedProduct.heartText}
                          </p>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-lotus-pink" />
                            這份禮物將帶給你...
                          </h3>
                          <p className="text-lg text-coffee-light leading-relaxed font-serif italic">
                            {selectedProduct.benefitText}
                          </p>
                        </div>

                        <div className="space-y-8">
                          <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-2">
                            <Package className="w-6 h-6 text-lotus-pink" />
                            內容物示意
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {selectedProduct.contentImages.map((img: string, i: number) => (
                              <div key={i} className="aspect-square rounded-2xl overflow-hidden warm-shadow group">
                                <img 
                                  src={img} 
                                  alt="Content preview" 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-10 rounded-[3rem] bg-lotus-pink/5 border-2 border-dashed border-lotus-pink/30 space-y-6">
                          <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-2">
                            <Users className="w-6 h-6 text-lotus-pink" />
                            送給想守護的人，包含你自己
                          </h3>
                          <p className="text-lg text-coffee-light leading-relaxed font-serif italic">
                            {selectedProduct.giftText}
                          </p>
                          <p className="text-sm text-lotus-pink font-bold">
                            「希望收到的人，都能因為這份溫暖，而變得更好一些。」
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    id="checkout-form"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto space-y-12 pb-24"
                  >
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-bold text-coffee-dark">填寫收件資訊</h2>
                      <p className="text-coffee-light">讓燈燈的溫暖能準時抵達你的手中</p>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] warm-shadow space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-coffee-dark">收件人姓名 <span className="text-lotus-pink">*</span></label>
                          <input 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border-2 border-lotus-pink/10 focus:border-lotus-pink outline-none transition-all" 
                            placeholder="怎麼稱呼你呢？" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-coffee-dark">聯繫電話 <span className="text-lotus-pink">*</span></label>
                          <input 
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border-2 border-lotus-pink/10 focus:border-lotus-pink outline-none transition-all" 
                            placeholder="方便聯繫的號碼" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <label className="text-sm font-bold text-coffee-dark">收件地址 <span className="text-lotus-pink">*</span></label>
                          <span className="text-[10px] text-lotus-pink font-medium">＊由中華郵政寄送</span>
                        </div>
                        <input 
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border-2 border-lotus-pink/10 focus:border-lotus-pink outline-none transition-all" 
                          placeholder="請填寫詳細地址" 
                        />
                        <p className="text-[10px] text-coffee-light/60 italic">務必填寫正確收件地址才收得到溫暖呦！</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-coffee-dark">電子郵件</label>
                        <input className="w-full h-12 px-4 rounded-xl border-2 border-lotus-pink/10 focus:border-lotus-pink outline-none transition-all" defaultValue={email} placeholder="接收訂閱通知" />
                      </div>

                      <div className="pt-8 border-t border-coffee-dark/5 space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-coffee-dark flex items-center gap-2">
                            <Heart className="w-5 h-5 text-lotus-pink" />
                            選擇陪伴長度
                          </h3>
                          <p className="text-sm text-coffee-light leading-relaxed italic">
                            「無論是長久的守護，還是短暫的相遇，燈燈都希望能給你最溫柔的支持。」
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                              onClick={() => setSelectedPlanType('annual')}
                              className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 text-left ${selectedPlanType === 'annual' ? 'border-lotus-pink bg-lotus-pink/5' : 'border-coffee-dark/5 hover:border-lotus-pink/30'}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`font-bold ${selectedPlanType === 'annual' ? 'text-coffee-dark' : 'text-coffee-light'}`}>年方案：長久守護</span>
                                <div className={`w-5 h-5 rounded-full border-4 ${selectedPlanType === 'annual' ? 'border-lotus-pink' : 'border-coffee-dark/10'}`} />
                              </div>
                              <span className="text-sm text-lotus-pink font-medium">{selectedProduct.priceYear}</span>
                            </button>
                            <button 
                              onClick={() => setSelectedPlanType('trial')}
                              className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 text-left ${selectedPlanType === 'trial' ? 'border-lotus-pink bg-lotus-pink/5' : 'border-coffee-dark/5 hover:border-lotus-pink/30'}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`font-bold ${selectedPlanType === 'trial' ? 'text-coffee-dark' : 'text-coffee-light'}`}>試用方案：初步遇見</span>
                                <div className={`w-5 h-5 rounded-full border-4 ${selectedPlanType === 'trial' ? 'border-lotus-pink' : 'border-coffee-dark/10'}`} />
                              </div>
                              <span className="text-sm text-lotus-pink font-medium">{selectedProduct.priceMonth}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-coffee-dark/5 space-y-6">
                        <h3 className="text-xl font-bold text-coffee-dark flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-lotus-pink" />
                          付款方式
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button className="p-4 rounded-2xl border-2 border-lotus-pink bg-lotus-pink/5 text-coffee-dark font-bold flex items-center justify-between">
                            信用卡 / 金融卡
                            <div className="w-5 h-5 rounded-full border-4 border-lotus-pink" />
                          </button>
                          <button className="p-4 rounded-2xl border-2 border-coffee-dark/5 text-coffee-light font-medium flex items-center justify-between hover:border-lotus-pink/30 transition-all">
                            LINE Pay
                            <div className="w-5 h-5 rounded-full border-2 border-coffee-dark/10" />
                          </button>
                        </div>
                      </div>

                      <Button 
                        onClick={() => setCheckoutStep('success')}
                        disabled={!isFormValid}
                        className={`w-full h-16 rounded-2xl font-bold text-xl shadow-xl mt-8 transition-all ${isFormValid ? 'bg-coffee-dark hover:bg-coffee-dark/90 text-white' : 'bg-coffee-dark/20 text-coffee-dark/40 cursor-not-allowed'}`}
                      >
                        {isFormValid ? '確認並付款' : '請填寫完整資訊'}
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}

              {checkoutStep === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-lg mx-auto text-center space-y-8 py-20"
                >
                  <div className="w-24 h-24 bg-lotus-pink/20 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-12 h-12 text-lotus-pink animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-coffee-dark">訂閱成功！</h2>
                    <p className="text-lg text-coffee-light leading-relaxed font-serif italic">
                      「謝謝你願意讓燈燈走進你的生活。<br />
                      這份溫暖正在準備中，很快就會抵達你的身邊。」
                    </p>
                  </div>
                  <Button 
                    onClick={() => setSelectedProduct(null)}
                    className="rounded-full px-12 h-14 bg-lotus-pink text-white font-bold"
                  >
                    回到空間
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
