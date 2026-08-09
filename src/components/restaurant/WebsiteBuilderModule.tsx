import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import {
  Globe,
  Smartphone,
  Monitor,
  Save,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  UtensilsCrossed,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Palette,
  Sliders,
  Award,
  Heart,
  ChefHat,
  Menu as MenuIcon,
  X,
  Check,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Eye,
  Upload,
  ChevronDown,
  ChevronUp,
  Navigation,
  Compass
} from 'lucide-react';

type PreviewDevice = 'desktop' | 'mobile';
type EditorTab = 'sections' | 'content' | 'branding' | 'seo';

export interface SectionItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: React.ComponentType<any>;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  {
    id: 'hero',
    label: 'Hero & Welcome Banner',
    description: 'Main title, subtitle, cover photo, and navigation shortcuts',
    enabled: true,
    icon: Sparkles,
  },
  {
    id: 'menu',
    label: 'Seasonal Menu Showcase',
    description: 'Interactive dish catalog with categories, dietary tags, and photos',
    enabled: true,
    icon: UtensilsCrossed,
  },
  {
    id: 'story',
    label: 'Our Story & Executive Chef',
    description: 'Culinary philosophy and Executive Chef profile',
    enabled: true,
    icon: ChefHat,
  },
  {
    id: 'gallery',
    label: 'Atmosphere & Gallery',
    description: 'High-res photos of dining terrace, dishes, and ambiance',
    enabled: true,
    icon: ImageIcon,
  },
  {
    id: 'contact',
    label: 'Location, Hours & Contact',
    description: 'Operating schedule, map, address, phone, and social links',
    enabled: true,
    icon: MapPin,
  },
];

const PRESET_HERO_IMAGES = [
  {
    name: 'Candlelit Fine Dining',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Modern Oceanview Bistro',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Warm Rustic Woodfire Oven',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Intimate Bar & Lounge',
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
  },
];

const INITIAL_GALLERY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    title: 'Signature Sea Bass',
    category: 'Main Courses',
  },
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    title: 'A5 Wagyu Cut',
    category: 'Grill',
  },
  {
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    title: 'Natural Cellar Selection',
    category: 'Wines',
  },
  {
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80',
    title: 'Outdoor Terrace',
    category: 'Ambiance',
  },
  {
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    title: 'Fresh Burrata Starter',
    category: 'Starters',
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    title: 'Main Dining Room',
    category: 'Ambiance',
  },
];

/**
 * Reusable Drag-and-Drop Image File Upload Component
 */
interface ImageUploadBoxProps {
  label: string;
  description?: string;
  currentImage?: string;
  onImageChange: (dataUrl: string) => void;
  onClear?: () => void;
  recommendedSize?: string;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  label,
  description,
  currentImage,
  onImageChange,
  onClear,
  recommendedSize = '1200 x 800px or larger',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-800 flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-teal-600" />
          <span>{label}</span>
        </label>
        {currentImage && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] font-medium text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
          >
            Clear Image
          </button>
        )}
      </div>

      {description && <p className="text-[10px] text-slate-500 leading-tight">{description}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-3 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
          isDragging
            ? 'border-teal-500 bg-teal-50/90 scale-[1.01] shadow-sm'
            : currentImage
            ? 'border-teal-300 bg-teal-50/20 hover:border-teal-500 hover:bg-teal-50/40'
            : 'border-slate-300 bg-slate-50/80 hover:border-teal-400 hover:bg-slate-100/80'
        }`}
      >
        {currentImage ? (
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-xs">
              <img src={currentImage} alt="Uploaded preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Custom Image Uploaded</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                Click or drop a new image file to replace
              </p>
            </div>
          </div>
        ) : (
          <div className="py-2 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <Upload className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-semibold text-slate-700">
              Drag & drop image file here, or <span className="text-teal-600 underline">browse</span>
            </div>
            <div className="text-[9px] text-slate-400">
              PNG, JPG, WEBP or SVG ({recommendedSize})
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const WebsiteBuilderModule: React.FC = () => {
  const { websiteConfig, updateWebsiteConfig, activeRestaurant, menuItems } = useApp();

  // Scroll Container Ref
  const previewScrollRef = useRef<HTMLDivElement>(null);

  // Builder State
  const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('sections');
  const [device, setDevice] = useState<PreviewDevice>('desktop');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [saved, setSaved] = useState(false);

  // Expanded section accordion in Section Reordering tab
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  // Section Reordering & Toggles State
  const [sections, setSections] = useState<SectionItem[]>(() => {
    if (websiteConfig.sectionOrder && websiteConfig.sectionOrder.length > 0) {
      const sectionMap = new Map(DEFAULT_SECTIONS.map((s) => [s.id, s]));
      const ordered: SectionItem[] = [];
      websiteConfig.sectionOrder.forEach((id) => {
        const found = sectionMap.get(id);
        if (found) {
          ordered.push({
            ...found,
            enabled:
              id === 'hero'
                ? true
                : id === 'menu'
                ? websiteConfig.showMenu ?? true
                : id === 'story'
                ? websiteConfig.showChefStory ?? true
                : id === 'gallery'
                ? websiteConfig.showGallery ?? true
                : id === 'contact'
                ? websiteConfig.showMap ?? true
                : true,
          });
          sectionMap.delete(id);
        }
      });
      sectionMap.forEach((s) => ordered.push(s));
      return ordered;
    }
    return DEFAULT_SECTIONS;
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Editable Copy, Images & Styling Fields
  const [heroTitle, setHeroTitle] = useState(websiteConfig.heroTitle || 'Culinary Excellence & Seasonal Flavors');
  const [heroSubtitle, setHeroSubtitle] = useState(
    websiteConfig.heroSubtitle || 'Experience artisanal gastronomy handcrafted with local organic ingredients in an extraordinary ambiance.'
  );
  const [heroImage, setHeroImage] = useState(websiteConfig.heroImage || PRESET_HERO_IMAGES[0].url);
  const [logoImage, setLogoImage] = useState(websiteConfig.logoImage || '');
  const [aboutText, setAboutText] = useState(
    websiteConfig.aboutText || 'Founded with a passion for sustainable local cuisine, our kitchen combines classic culinary techniques with bold contemporary flavors.'
  );
  const [openingHours, setOpeningHours] = useState(websiteConfig.openingHours || 'Tue - Sun: 5:00 PM - 11:00 PM (Closed Mondays)');
  const [contactEmail, setContactEmail] = useState(websiteConfig.contactEmail || 'reservations@luminabistro.com');
  const [contactPhone, setContactPhone] = useState(websiteConfig.contactPhone || '(415) 555-0192');
  const [themeColor, setThemeColor] = useState(websiteConfig.themeColor || '#0d9488');
  const [heroStyle, setHeroStyle] = useState(websiteConfig.heroStyle || 'luxury-dark');
  const [fontStyle, setFontStyle] = useState(websiteConfig.fontStyle || 'editorial');
  const [announcementText, setAnnouncementText] = useState(
    websiteConfig.announcementText || '✨ Seasonal Tasting Menu Now Available — Explore Our Daily Dishes Below'
  );
  const [showAnnouncement, setShowAnnouncement] = useState(websiteConfig.showAnnouncement ?? true);
  const [chefName, setChefName] = useState(websiteConfig.chefName || 'Chef Antoine Laurent');
  const [chefTitle, setChefTitle] = useState(websiteConfig.chefTitle || 'Executive Chef & Founder');
  const [chefImage, setChefImage] = useState(
    websiteConfig.chefImage || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'
  );
  const [customDomain, setCustomDomain] = useState(websiteConfig.customDomain || 'luminabistro.com');

  // Custom Menu Items with Uploaded Photos State
  const [customMenuItems, setCustomMenuItems] = useState<MenuItem[]>(menuItems);
  const [selectedDishForPhoto, setSelectedDishForPhoto] = useState<string>(
    menuItems[0]?.id || ''
  );

  // Custom Gallery Photos State
  const [galleryPhotos, setGalleryPhotos] = useState(INITIAL_GALLERY_PHOTOS);
  const [newGalleryTitle, setNewGalleryTitle] = useState('');

  // Mobile Menu State inside preview
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('All');

  // Reordering Handlers
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);
    setSections(newSections);
  };

  const toggleSectionEnabled = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newSections = [...sections];
    const [moved] = newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, moved);
    setDraggedIndex(index);
    setSections(newSections);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Smooth scroll inside preview frame container
  const scrollToPreviewSection = (sectionId: string) => {
    const container = previewScrollRef.current;
    if (!container) return;
    if (sectionId === 'hero') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(`preview-section-${sectionId}`);
    if (el) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scrollTop = container.scrollTop + (elRect.top - containerRect.top) - 8;
      container.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
    }
  };

  // Handle dish image upload
  const handleDishImageChange = (dishId: string, dataUrl: string) => {
    setCustomMenuItems((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, imageUrl: dataUrl } : item))
    );
  };

  // Handle gallery photo upload
  const handleAddGalleryPhoto = (dataUrl: string) => {
    setGalleryPhotos((prev) => [
      {
        url: dataUrl,
        title: newGalleryTitle || 'Uploaded Signature Photo',
        category: 'Custom Upload',
      },
      ...prev,
    ]);
    setNewGalleryTitle('');
  };

  const handleSave = () => {
    const sectionOrderIds = sections.map((s) => s.id);
    const getEnabled = (id: string) => sections.find((s) => s.id === id)?.enabled ?? true;

    updateWebsiteConfig({
      heroTitle,
      heroSubtitle,
      heroImage,
      aboutText,
      openingHours,
      contactEmail,
      contactPhone,
      themeColor,
      heroStyle,
      fontStyle,
      announcementText,
      showAnnouncement,
      chefName,
      chefTitle,
      chefImage,
      logoImage,
      customDomain,
      showOnlineReservation: false,
      showMenu: getEnabled('menu'),
      showChefStory: getEnabled('story'),
      showGallery: getEnabled('gallery'),
      showReviews: false,
      showMap: getEnabled('contact'),
      sectionOrder: sectionOrderIds,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const copyLiveUrl = () => {
    navigator.clipboard.writeText(`https://${customDomain}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Filter menu items for website preview
  const menuCategories = ['All', ...Array.from(new Set(customMenuItems.map((m) => m.category)))];
  const filteredMenuItems =
    activeMenuCategory === 'All'
      ? customMenuItems.slice(0, 6)
      : customMenuItems.filter((m) => m.category === activeMenuCategory).slice(0, 6);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Bar Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200/80 text-[11px] font-bold uppercase tracking-wider">
              Single-Page Website Builder
            </span>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Responsive Website
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Website Layout, Smooth Scroll & Media Editor
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Copy Live Domain */}
          <button
            onClick={copyLiveUrl}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="font-mono">{customDomain}</span>
          </button>

          {/* Device Responsive Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                device === 'desktop' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                device === 'mobile' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

          {/* Publish Website Button */}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs shadow-teal-200 flex items-center gap-1.5 cursor-pointer"
          >
            {saved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Changes Published!' : 'Publish Website'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls Left, Device Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Editor Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          {/* Builder Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 p-1 overflow-x-auto text-xs custom-scrollbar">
            <button
              onClick={() => setActiveEditorTab('sections')}
              className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeEditorTab === 'sections' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GripVertical className="w-3.5 h-3.5 text-teal-600" />
              <span>Sections</span>
            </button>
            <button
              onClick={() => setActiveEditorTab('content')}
              className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeEditorTab === 'content' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveEditorTab('branding')}
              className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeEditorTab === 'branding' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Branding</span>
            </button>
            <button
              onClick={() => setActiveEditorTab('seo')}
              className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeEditorTab === 'seo' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Domain</span>
            </button>
          </div>

          <div className="p-5 text-xs space-y-5">
            {/* TAB 1: SECTIONS ORDER & TOGGLES */}
            {activeEditorTab === 'sections' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <GripVertical className="w-4 h-4 text-teal-600" /> Section Order & Layout
                    </h3>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/80">
                      Single-Page Site
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">
                    Drag section cards to reorder. Click <strong>Media</strong> to upload images directly.
                  </p>
                </div>

                {/* Section List */}
                <div className="space-y-2.5">
                  {sections.map((sec, idx) => {
                    const IconComp = sec.icon;
                    const isDragging = draggedIndex === idx;
                    const isExpanded = expandedSectionId === sec.id;

                    return (
                      <div
                        key={sec.id}
                        className={`rounded-xl border transition-all overflow-hidden ${
                          isDragging
                            ? 'border-teal-500 bg-teal-50/90 shadow-md scale-[1.02] z-10'
                            : sec.enabled
                            ? 'border-slate-200 bg-white hover:border-teal-300'
                            : 'border-slate-200 bg-slate-50/60 opacity-60'
                        }`}
                      >
                        {/* Main Card Header */}
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDragEnd={handleDragEnd}
                          className="p-3 flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <div className="p-1 text-slate-400 hover:text-slate-700">
                              <GripVertical className="w-4 h-4 shrink-0" />
                            </div>
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                sec.enabled ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <div className="truncate">
                              <div className="font-bold text-slate-900 truncate text-[12px] flex items-center gap-1.5">
                                <span>{sec.label}</span>
                                <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">{sec.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
                              title="Upload media & section settings"
                              className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                                isExpanded
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                              }`}
                            >
                              <Upload className="w-3 h-3" />
                              <span>Media</span>
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => scrollToPreviewSection(sec.id)}
                              title="Scroll to section in preview"
                              className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveSection(idx, 'up')}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              disabled={idx === sections.length - 1}
                              onClick={() => moveSection(idx, 'down')}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            {sec.id !== 'hero' ? (
                              <button
                                type="button"
                                onClick={() => toggleSectionEnabled(sec.id)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                                  sec.enabled
                                    ? 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                              >
                                {sec.enabled ? 'Active' : 'Hidden'}
                              </button>
                            ) : (
                              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-medium">
                                Required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expanded Media Uploader */}
                        {isExpanded && (
                          <div className="p-3.5 bg-slate-50/90 border-t border-slate-200 space-y-3 animate-in slide-in-from-top-1 duration-150">
                            {sec.id === 'hero' && (
                              <div className="space-y-3">
                                <ImageUploadBox
                                  label="Hero Section Background Photo"
                                  description="Upload high-res cover photo for your website hero header"
                                  currentImage={heroImage}
                                  onImageChange={(url) => setHeroImage(url)}
                                  onClear={() => setHeroImage(PRESET_HERO_IMAGES[0].url)}
                                  recommendedSize="1920 x 1080px JPG or WEBP"
                                />
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-700 mb-1">Preset Hero Photos</label>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {PRESET_HERO_IMAGES.map((preset, pIdx) => (
                                      <button
                                        key={pIdx}
                                        type="button"
                                        onClick={() => setHeroImage(preset.url)}
                                        className={`p-1.5 rounded-lg border text-left flex items-center gap-1.5 cursor-pointer ${
                                          heroImage === preset.url ? 'border-teal-600 bg-teal-50' : 'border-slate-200 bg-white'
                                        }`}
                                      >
                                        <img src={preset.url} alt="" className="w-6 h-6 rounded object-cover" />
                                        <span className="text-[9px] font-medium truncate text-slate-700">{preset.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {sec.id === 'menu' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="block font-bold text-slate-800 text-xs mb-1">Upload Photo for Menu Item</label>
                                  <select
                                    value={selectedDishForPhoto}
                                    onChange={(e) => setSelectedDishForPhoto(e.target.value)}
                                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                                  >
                                    {customMenuItems.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name} (${item.price.toFixed(2)})
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {selectedDishForPhoto && (
                                  <ImageUploadBox
                                    label={`Photo for ${customMenuItems.find((m) => m.id === selectedDishForPhoto)?.name}`}
                                    description="Drag and drop or select food photo for menu catalog"
                                    currentImage={customMenuItems.find((m) => m.id === selectedDishForPhoto)?.imageUrl}
                                    onImageChange={(url) => handleDishImageChange(selectedDishForPhoto, url)}
                                    onClear={() => handleDishImageChange(selectedDishForPhoto, '')}
                                    recommendedSize="800 x 800px Square JPG"
                                  />
                                )}
                              </div>
                            )}

                            {sec.id === 'story' && (
                              <div className="space-y-3">
                                <ImageUploadBox
                                  label="Executive Chef Portrait Photo"
                                  description="Upload Chef or founder portrait photo"
                                  currentImage={chefImage}
                                  onImageChange={(url) => setChefImage(url)}
                                  onClear={() =>
                                    setChefImage(
                                      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'
                                    )
                                  }
                                  recommendedSize="800 x 1000px Portrait JPG"
                                />
                              </div>
                            )}

                            {sec.id === 'gallery' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="block font-bold text-slate-800 text-xs mb-1">Photo Title</label>
                                  <input
                                    type="text"
                                    value={newGalleryTitle}
                                    onChange={(e) => setNewGalleryTitle(e.target.value)}
                                    placeholder="e.g. Dining Room Ambiance"
                                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                                  />
                                </div>
                                <ImageUploadBox
                                  label="Upload New Gallery Photo"
                                  description="Drag & drop new photo to append to gallery"
                                  currentImage=""
                                  onImageChange={(url) => handleAddGalleryPhoto(url)}
                                  recommendedSize="1000 x 800px High-res JPG"
                                />
                              </div>
                            )}

                            {sec.id === 'contact' && (
                              <div className="space-y-3">
                                <ImageUploadBox
                                  label="Restaurant Logo Image File"
                                  description="Upload transparent logo for header & footer"
                                  currentImage={logoImage}
                                  onImageChange={(url) => setLogoImage(url)}
                                  onClear={() => setLogoImage('')}
                                  recommendedSize="400 x 400px Transparent PNG"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Hero Layout Style Options */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <label className="block font-bold text-slate-900">Hero Layout Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setHeroStyle('luxury-dark')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        heroStyle === 'luxury-dark'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[11px]">Luxury Dark</div>
                      <div className="text-[9px] text-slate-400">Full Background</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroStyle('warm-minimal')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        heroStyle === 'warm-minimal'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[11px]">Warm Minimal</div>
                      <div className="text-[9px] text-slate-400">Centered Clean</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroStyle('split-image')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        heroStyle === 'split-image'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[11px]">Split Card</div>
                      <div className="text-[9px] text-slate-400">Text & Photo</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COPYWRITING & CONTENT */}
            {activeEditorTab === 'content' && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Website Text & Narrative Copy</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">Customize main headlines, subtitle, story, and contact details.</p>
                </div>

                {/* Announcement Banner */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-900">Announcement Bar</label>
                    <input
                      type="checkbox"
                      checked={showAnnouncement}
                      onChange={(e) => setShowAnnouncement(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                    />
                  </div>
                  {showAnnouncement && (
                    <input
                      type="text"
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 text-xs"
                    />
                  )}
                </div>

                {/* Hero Headline */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                    <span>1. Hero Section Copy</span>
                    <span className="text-[10px] text-teal-600 font-mono">#hero</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subtitle Description</label>
                    <textarea
                      rows={2}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs"
                    />
                  </div>
                </div>

                {/* About & Chef Narrative */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                    <span>2. Our Story & Executive Chef</span>
                    <span className="text-[10px] text-teal-600 font-mono">#story</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">About Us Narrative</label>
                    <textarea
                      rows={3}
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Chef Name</label>
                      <input
                        type="text"
                        value={chefName}
                        onChange={(e) => setChefName(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={chefTitle}
                        onChange={(e) => setChefTitle(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Hours & Contact */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                    <span>3. Hours & Contact Information</span>
                    <span className="text-[10px] text-teal-600 font-mono">#contact</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={openingHours}
                      onChange={(e) => setOpeningHours(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="text"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BRANDING & THEME */}
            {activeEditorTab === 'branding' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Logo File & Visual Styling</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">Upload custom brand logo and configure color scheme.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <ImageUploadBox
                    label="Upload Restaurant Logo File"
                    description="Upload transparent PNG, SVG, or high-res JPG logo"
                    currentImage={logoImage}
                    onImageChange={(url) => setLogoImage(url)}
                    onClear={() => setLogoImage('')}
                    recommendedSize="400 x 400px Transparent PNG"
                  />

                  {!logoImage && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-xs"
                        style={{ backgroundColor: themeColor }}
                      >
                        {activeRestaurant.name.charAt(0)}
                      </div>
                      <div className="text-[11px]">
                        <div className="font-bold text-slate-900">Default Brand Badge</div>
                        <div className="text-slate-500">Upload a logo file above to customize</div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">Accent Theme Color</label>
                  <div className="flex items-center gap-3">
                    {[
                      { name: 'Teal', hex: '#0d9488' },
                      { name: 'Amber', hex: '#d97706' },
                      { name: 'Rose', hex: '#e11d48' },
                      { name: 'Dark Slate', hex: '#1e293b' },
                      { name: 'Indigo', hex: '#4f46e5' },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setThemeColor(c.hex)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-transform cursor-pointer ${
                          themeColor === c.hex ? 'border-slate-900 scale-110 shadow-sm' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {themeColor === c.hex && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">Typography Pairings</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFontStyle('editorial')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        fontStyle === 'editorial' ? 'border-teal-600 bg-teal-50 font-bold' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-serif text-sm">Playfair Serif</div>
                      <div className="text-[9px] text-slate-400">Editorial Luxe</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontStyle('sans')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        fontStyle === 'sans' ? 'border-teal-600 bg-teal-50 font-bold' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-sans text-sm">Plus Jakarta Sans</div>
                      <div className="text-[9px] text-slate-400">Modern Clean</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: DOMAIN & SEO */}
            {activeEditorTab === 'seo' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Custom Domain & Search Result</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">Configure web address and search metadata.</p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Custom Web Address</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-xs">https://</span>
                    <input
                      type="text"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-[10px] text-slate-400 font-medium">Search Result Card Preview</div>
                  <div className="text-teal-700 font-semibold text-xs truncate">
                    {heroTitle} — {activeRestaurant.name}
                  </div>
                  <div className="text-[10px] text-emerald-700 truncate font-mono">https://{customDomain}</div>
                  <div className="text-[11px] text-slate-600 line-clamp-2">
                    {heroSubtitle} {aboutText}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save & Publish Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSave}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 text-xs"
              >
                <Save className="w-4 h-4 text-teal-400" />
                <span>Publish Website & Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Device Preview Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-slate-900 p-3 sm:p-5 rounded-3xl border border-slate-800 shadow-2xl space-y-3">
            {/* Device Header Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-teal-400" />
                  <span>https://{customDomain}</span>
                </span>
              </div>

              {/* Navigation Jump Bar */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                {sections
                  .filter((s) => s.enabled)
                  .map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToPreviewSection(sec.id)}
                      className="px-2 py-1 rounded text-[10px] font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      {sec.label.split('&')[0]}
                    </button>
                  ))}
              </div>
            </div>

            {/* DEVICE CANVAS */}
            <div
              className={`mx-auto bg-white transition-all duration-300 rounded-2xl overflow-hidden text-slate-800 shadow-2xl ${
                device === 'mobile'
                  ? 'max-w-[390px] border-8 border-slate-800 rounded-[38px] my-2'
                  : 'w-full'
              }`}
            >
              {/* Mobile Status Bar */}
              {device === 'mobile' && (
                <div className="bg-slate-950 text-white px-5 py-1.5 flex items-center justify-between text-[10px] font-mono">
                  <span>9:41</span>
                  <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto" />
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <div className="w-3 h-2 bg-emerald-400 rounded-2xs" />
                  </div>
                </div>
              )}

              {/* SINGLE SCROLL CONTAINER (Includes Integrated Navbar, Banner, Sections & Footer) */}
              <div
                ref={previewScrollRef}
                className="max-h-[620px] overflow-y-auto space-y-0 custom-scrollbar scroll-smooth relative"
              >
                {/* Announcement Top Banner */}
                {showAnnouncement && (
                  <div
                    className="px-4 py-2 text-white text-[11px] font-medium text-center flex items-center justify-center gap-2 shadow-xs"
                    style={{ backgroundColor: themeColor }}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                    <span className="truncate">{announcementText}</span>
                  </div>
                )}

                {/* INTEGRATED BRAND NAVBAR (Sticky at top of canvas) */}
                <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between transition-all duration-300 shadow-2xs">
                  {/* Brand Logo & Name */}
                  <div
                    onClick={() => scrollToPreviewSection('hero')}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    {logoImage ? (
                      <img
                        src={logoImage}
                        alt="Logo"
                        className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: themeColor }}
                      >
                        {activeRestaurant.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-bold text-base tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                      {activeRestaurant.name}
                    </span>
                  </div>

                  {/* Navigation Links */}
                  {device === 'desktop' ? (
                    <nav className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                      {sections
                        .filter((s) => s.enabled)
                        .map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => scrollToPreviewSection(sec.id)}
                            className="hover:text-slate-900 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-teal-600"
                          >
                            {sec.label.split('&')[0]}
                          </button>
                        ))}
                      <button
                        onClick={() => scrollToPreviewSection('menu')}
                        className="px-3.5 py-1.5 rounded-lg text-white font-bold cursor-pointer shadow-xs transition-transform hover:scale-105 text-xs"
                        style={{ backgroundColor: themeColor }}
                      >
                        View Menu
                      </button>
                    </nav>
                  ) : (
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="p-1.5 text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                    >
                      {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                    </button>
                  )}
                </header>

                {/* Mobile Drawer Navigation inside Preview Canvas */}
                {device === 'mobile' && mobileMenuOpen && (
                  <div className="sticky top-[53px] z-30 bg-slate-900 text-white p-4 space-y-2 text-xs border-b border-slate-800 shadow-xl animate-in slide-in-from-top-2 duration-200">
                    {sections
                      .filter((s) => s.enabled)
                      .map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => {
                            scrollToPreviewSection(sec.id);
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left py-2 hover:text-teal-300 font-semibold border-b border-slate-800/80 transition-colors"
                        >
                          {sec.label}
                        </button>
                      ))}
                    <button
                      onClick={() => {
                        scrollToPreviewSection('menu');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full mt-3 py-2.5 text-white font-bold rounded-xl text-center shadow-md"
                      style={{ backgroundColor: themeColor }}
                    >
                      Explore Menu Catalog
                    </button>
                  </div>
                )}

                {/* DYNAMIC SECTIONS */}
                {sections
                  .filter((sec) => sec.enabled)
                  .map((sec) => {
                    if (sec.id === 'hero') {
                      return (
                        <section key="hero" id="preview-section-hero" className="relative">
                          {heroStyle === 'luxury-dark' && (
                            <div className="relative min-h-[360px] flex items-center justify-center p-6 text-center text-white overflow-hidden">
                              <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px]" />
                              <div className="relative z-10 max-w-lg mx-auto space-y-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-teal-300 border border-white/20">
                                  {activeRestaurant.name} • Gastronomy & Bistro
                                </span>
                                <h1
                                  className={`text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight ${
                                    fontStyle === 'editorial' ? 'font-serif' : ''
                                  }`}
                                >
                                  {heroTitle}
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 max-w-md mx-auto leading-relaxed">
                                  {heroSubtitle}
                                </p>
                                <div className="pt-2 flex items-center justify-center gap-3">
                                  <button
                                    onClick={() => scrollToPreviewSection('menu')}
                                    className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md cursor-pointer transition-transform hover:scale-105"
                                    style={{ backgroundColor: themeColor }}
                                  >
                                    Explore Menu
                                  </button>
                                  <button
                                    onClick={() => scrollToPreviewSection('contact')}
                                    className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 backdrop-blur-md cursor-pointer transition-colors"
                                  >
                                    Location & Hours
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {heroStyle === 'warm-minimal' && (
                            <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-teal-50/50 to-white border-b border-teal-100/60 space-y-4">
                              <span className="text-[11px] uppercase font-bold tracking-widest text-teal-700">
                                Welcome to {activeRestaurant.name}
                              </span>
                              <h1
                                className={`text-2xl sm:text-3xl font-bold text-slate-900 leading-tight ${
                                  fontStyle === 'editorial' ? 'font-serif' : ''
                                }`}
                              >
                                {heroTitle}
                              </h1>
                              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">{heroSubtitle}</p>
                              <div className="pt-2 flex justify-center gap-3">
                                <button
                                  onClick={() => scrollToPreviewSection('menu')}
                                  className="px-5 py-2.5 rounded-xl text-white font-bold text-xs cursor-pointer shadow-sm"
                                  style={{ backgroundColor: themeColor }}
                                >
                                  Explore Seasonal Menu
                                </button>
                                <button
                                  onClick={() => scrollToPreviewSection('contact')}
                                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs cursor-pointer"
                                >
                                  Contact & Location
                                </button>
                              </div>
                            </div>
                          )}

                          {heroStyle === 'split-image' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 bg-slate-50 items-center border-b border-slate-200">
                              <div className="space-y-3">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-700">
                                  {activeRestaurant.name}
                                </span>
                                <h1
                                  className={`text-xl sm:text-2xl font-bold text-slate-900 leading-tight ${
                                    fontStyle === 'editorial' ? 'font-serif' : ''
                                  }`}
                                >
                                  {heroTitle}
                                </h1>
                                <p className="text-xs text-slate-600 leading-relaxed">{heroSubtitle}</p>
                                <div className="pt-1 flex gap-2">
                                  <button
                                    onClick={() => scrollToPreviewSection('menu')}
                                    className="px-4 py-2 rounded-xl text-white font-bold text-xs cursor-pointer shadow-xs"
                                    style={{ backgroundColor: themeColor }}
                                  >
                                    View Dishes
                                  </button>
                                  <button
                                    onClick={() => scrollToPreviewSection('contact')}
                                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                                  >
                                    Hours & Location
                                  </button>
                                </div>
                              </div>
                              <img src={heroImage} alt="" className="w-full h-48 object-cover rounded-2xl shadow-md border border-slate-200" />
                            </div>
                          )}
                        </section>
                      );
                    }

                    if (sec.id === 'menu') {
                      return (
                        <section key="menu" id="preview-section-menu" className="p-6 sm:p-8 bg-white border-b border-slate-100 space-y-6">
                          <div className="text-center space-y-1.5">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-700">
                              Gastronomy & Tasting
                            </span>
                            <h2
                              className={`text-2xl font-bold text-slate-900 ${
                                fontStyle === 'editorial' ? 'font-serif' : ''
                              }`}
                            >
                              Seasonal Menu & Catalog
                            </h2>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                              Crafted daily with local organic produce and sustainable catch.
                            </p>
                          </div>

                          {/* Category Filter Chips */}
                          <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1 text-[11px] custom-scrollbar">
                            {menuCategories.map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setActiveMenuCategory(cat)}
                                className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 ${
                                  activeMenuCategory === cat
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          {/* Menu Items Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredMenuItems.map((item) => (
                              <div
                                key={item.id}
                                className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition-all bg-slate-50/50 hover:bg-white flex gap-3.5 shadow-2xs"
                              >
                                {item.imageUrl && (
                                  <img
                                    src={item.imageUrl}
                                    alt=""
                                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-2xs"
                                  />
                                )}
                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center justify-between gap-1">
                                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.name}</h4>
                                      <span className="font-bold text-xs text-teal-700 shrink-0">${item.price.toFixed(2)}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">{item.description}</p>
                                  </div>
                                  {item.dietary && item.dietary.length > 0 && (
                                    <div className="flex items-center gap-1 mt-1.5">
                                      {item.dietary.map((d, i) => (
                                        <span
                                          key={i}
                                          className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200/60 uppercase"
                                        >
                                          {d}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    }

                    if (sec.id === 'story') {
                      return (
                        <section key="story" id="preview-section-story" className="p-6 sm:p-8 bg-teal-50/30 border-b border-teal-100/60 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            <div className="sm:col-span-5 relative">
                              <img
                                src={chefImage}
                                alt={chefName}
                                className="w-full h-56 object-cover rounded-2xl shadow-md border border-teal-100"
                              />
                              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md text-white p-2.5 rounded-xl text-[10px] space-y-0.5">
                                <div className="font-bold text-xs text-white">{chefName}</div>
                                <div className="text-teal-300 text-[10px]">{chefTitle}</div>
                              </div>
                            </div>
                            <div className="sm:col-span-7 space-y-3">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-700">
                                Culinary Heritage
                              </span>
                              <h3
                                className={`text-xl font-bold text-slate-900 ${
                                  fontStyle === 'editorial' ? 'font-serif' : ''
                                }`}
                              >
                                Our Story & Philosophy
                              </h3>
                              <p className="text-xs text-slate-600 leading-relaxed">{aboutText}</p>
                              <div className="pt-2 flex items-center gap-4 text-[11px] font-medium text-slate-700">
                                <span className="flex items-center gap-1.5">
                                  <Award className="w-4 h-4 text-teal-600" /> Michelin Guide
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Heart className="w-4 h-4 text-rose-500" /> Farm to Table
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>
                      );
                    }

                    if (sec.id === 'gallery') {
                      return (
                        <section key="gallery" id="preview-section-gallery" className="p-6 sm:p-8 bg-white border-b border-slate-100 space-y-4">
                          <div className="text-center space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-700">
                              Visual Atmosphere
                            </span>
                            <h2
                              className={`text-xl font-bold text-slate-900 ${
                                fontStyle === 'editorial' ? 'font-serif' : ''
                              }`}
                            >
                              Atmosphere & Gallery
                            </h2>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {galleryPhotos.map((photo, i) => (
                              <div key={i} className="group relative rounded-xl overflow-hidden bg-slate-100 h-32 border border-slate-200">
                                <img
                                  src={photo.url}
                                  alt={photo.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end text-white text-[10px]">
                                  <span className="font-bold">{photo.title}</span>
                                  <span className="text-[8px] text-teal-300">{photo.category}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    }

                    if (sec.id === 'contact') {
                      return (
                        <section key="contact" id="preview-section-contact" className="p-6 sm:p-8 bg-white space-y-6">
                          <div className="text-center space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-700">
                              Visit & Connect
                            </span>
                            <h2
                              className={`text-2xl font-bold text-slate-900 ${
                                fontStyle === 'editorial' ? 'font-serif' : ''
                              }`}
                            >
                              Location, Hours & Directions
                            </h2>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                              <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                                <div>
                                  <div className="font-bold text-slate-900 text-xs">Opening Schedule</div>
                                  <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{openingHours}</div>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                                <div>
                                  <div className="font-bold text-slate-900 text-xs">Address</div>
                                  <div className="text-[11px] text-slate-600 mt-0.5">
                                    {activeRestaurant.address || '1048 Market Street, San Francisco, CA 94103'}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                                <div>
                                  <div className="font-bold text-slate-900 text-xs">Contact & Inquiries</div>
                                  <div className="text-[11px] text-slate-600 mt-0.5">
                                    {contactPhone} • {contactEmail}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Interactive Map Visual Card */}
                            <div className="bg-slate-900 rounded-2xl overflow-hidden min-h-[160px] relative flex flex-col justify-between p-4 text-white border border-slate-800 shadow-md">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="bg-teal-600 text-white font-bold px-2 py-0.5 rounded-md">
                                  San Francisco Center
                                </span>
                                <span className="text-slate-300">Valet Parking</span>
                              </div>
                              <div className="text-center py-4 space-y-1">
                                <MapPin className="w-7 h-7 text-teal-400 mx-auto animate-bounce" />
                                <div className="font-bold text-sm text-white">{activeRestaurant.name}</div>
                                <div className="text-[10px] text-slate-300">1048 Market Street, SF</div>
                              </div>
                              <div className="text-[9px] text-teal-300 text-center font-medium">
                                Direct Navigation via Google Maps & Apple Maps
                              </div>
                            </div>
                          </div>
                        </section>
                      );
                    }

                    return null;
                  })}

                {/* Public Footer */}
                <footer className="bg-slate-950 text-slate-400 p-5 text-[11px] border-t border-slate-900 text-center space-y-2">
                  <div className="font-medium text-slate-300">
                    © 2026 {activeRestaurant.name}. All rights reserved.
                  </div>
                  <div className="flex justify-center gap-4 text-slate-500 text-[10px]">
                    <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
                    <span>•</span>
                    <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
                    <span>•</span>
                    <span className="hover:text-slate-300 cursor-pointer">Accessibility</span>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
