import { generateMockAds } from './mock-data.js';

const mockAds = generateMockAds();

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(mockAds[0]);
