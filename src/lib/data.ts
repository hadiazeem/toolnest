import { Tool, Testimonial, BlogPost } from '@/types';

export const SITE_CONFIG = {
  name: 'ToolNest',
  tagline: 'Fast, Free & Powerful Online Tools',
  description:
    'ToolNest offers 10+ free online tools for images and PDFs. Remove backgrounds, compress files, merge PDFs, generate QR codes and more — all in your browser.',
  url: 'https://toolnest.app',
  ogImage: '/og-image.png',
  twitterHandle: '@toolnest',
};

export const TOOLS: Tool[] = [
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove image backgrounds instantly with AI precision.',
    icon: '✂️',
    category: 'image',
    href: '/tools/background-remover',
    color: 'from-pink-500 to-rose-500',
    popular: true,
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image file size without losing quality.',
    icon: '🗜️',
    category: 'image',
    href: '/tools/image-compressor',
    color: 'from-orange-500 to-amber-500',
    popular: true,
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to any dimension in seconds.',
    icon: '📐',
    category: 'image',
    href: '/tools/image-resizer',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG and other images to PDF.',
    icon: '📄',
    category: 'image',
    href: '/tools/image-to-pdf',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Compress PDF files to reduce their size.',
    icon: '📦',
    category: 'pdf',
    href: '/tools/pdf-compressor',
    color: 'from-red-500 to-orange-500',
    popular: true,
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Merge multiple PDF files into one document.',
    icon: '🔗',
    category: 'pdf',
    href: '/tools/pdf-merger',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Split a PDF into multiple separate files.',
    icon: '✂️',
    category: 'pdf',
    href: '/tools/pdf-splitter',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'pdf-password-protector',
    name: 'PDF Password Protector',
    description: 'Add a password to your PDF documents.',
    icon: '🔒',
    category: 'pdf',
    href: '/tools/pdf-password-protector',
    color: 'from-slate-600 to-gray-700',
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for any URL or text.',
    icon: '📱',
    category: 'utility',
    href: '/tools/qr-code-generator',
    color: 'from-indigo-500 to-blue-600',
    popular: true,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords instantly.',
    icon: '🔑',
    category: 'utility',
    href: '/tools/password-generator',
    color: 'from-yellow-500 to-orange-500',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    company: 'Figma',
    content:
      'ToolNest has completely replaced my paid subscriptions. The background remover is incredibly accurate, and the PDF tools save me hours every week.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Williams',
    role: 'Content Creator',
    company: 'YouTube',
    content:
      'I use the image compressor and QR generator daily. Fast, reliable, and free. I recommended ToolNest to my entire team.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Marketing Manager',
    company: 'Shopify',
    content:
      'The PDF tools are a game changer. Merging and compressing PDFs for client reports used to take forever. Now it takes seconds.',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Okonkwo',
    role: 'Freelance Developer',
    company: 'Independent',
    content:
      'Simple, fast, no sign-up required. ToolNest respects my time and privacy. The password generator alone is worth bookmarking.',
    rating: 5,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Remove Image Backgrounds for Free in 2025',
    excerpt:
      'Learn how to remove backgrounds from photos without expensive software using ToolNest\'s AI-powered background remover.',
    slug: 'how-to-remove-image-backgrounds-free',
    date: '2025-06-10',
    readTime: '5 min read',
    category: 'Image Tools',
  },
  {
    id: '2',
    title: 'The Ultimate Guide to PDF Compression',
    excerpt:
      'Discover the best practices for reducing PDF file sizes without sacrificing quality for sharing and storage.',
    slug: 'ultimate-guide-pdf-compression',
    date: '2025-06-05',
    readTime: '7 min read',
    category: 'PDF Tools',
  },
  {
    id: '3',
    title: 'Why Strong Passwords Matter More Than Ever in 2025',
    excerpt:
      'With data breaches on the rise, using a strong unique password for every account is your first line of defense.',
    slug: 'why-strong-passwords-matter-2025',
    date: '2025-05-28',
    readTime: '4 min read',
    category: 'Security',
  },
  {
    id: '4',
    title: 'QR Codes for Small Business: A Complete Guide',
    excerpt:
      'Everything you need to know about creating and using QR codes to boost your small business marketing.',
    slug: 'qr-codes-small-business-guide',
    date: '2025-05-20',
    readTime: '6 min read',
    category: 'QR Codes',
  },
];

export const HOME_FAQS = [
  {
    question: 'Are all ToolNest tools really free?',
    answer:
      'Yes! All 10 tools on ToolNest are completely free to use with no hidden fees, no sign-up required, and no usage limits.',
  },
  {
    question: 'Is my data safe when using ToolNest?',
    answer:
      'Absolutely. All file processing happens in your browser or on our secure servers, and we never store your files. They are deleted immediately after processing.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No account needed. Just visit the tool page, upload your file, and download the result. No email, no sign-up, no hassle.',
  },
  {
    question: 'What file formats are supported?',
    answer:
      'We support all major image formats (JPG, PNG, WebP, GIF, BMP) and PDF files. Each tool page lists the specific supported formats.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'For most tools, you can process files up to 50MB. For PDF tools, individual files up to 100MB are supported.',
  },
  {
    question: 'Can I use ToolNest on my phone?',
    answer:
      'Yes! ToolNest is fully responsive and optimized for mobile devices. All tools work on smartphones and tablets.',
  },
];
