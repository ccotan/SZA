/**
 * Скриншоты мира. Положите файлы в /public/media/gallery и перечислите здесь.
 * Пока список пуст — галерея не отображается (никаких чужих картинок из интернета).
 */
export type GalleryItem = { src: string; alt: string; title: string; author?: string };

export const gallery: GalleryItem[] = [];
