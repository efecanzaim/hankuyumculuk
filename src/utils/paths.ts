/**
 * Get asset path with basePath support for GitHub Pages
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  
  // If path already includes basePath, return as is
  if (path.includes('/gozumunnuru-new/')) {
    return path;
  }
  
  // If path is already absolute with leading slash, keep it
  // In production with GitHub Pages, basePath is '/gozumunnuru-new'
  // In development, basePath is empty
  const basePath = typeof window !== 'undefined' 
    ? (window as any).__NEXT_DATA__?.basePath || process.env.NEXT_PUBLIC_BASE_PATH || ''
    : process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // If path starts with /, remove it for basePath concatenation
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
