export interface Radio {
  changeId: string;
  id: string;
  name: string;
  url: string;
  urlResolved: string;
  homepage: string;
  favicon: string;
  country: string;
  countryCode: string;
  state: string;
  votes: number;
  codec: string;
  bitrate: number;
  clickCount: number;
  clickTrend: number;
  hls: boolean;
  lastCheckOk: boolean;
  lastChangeTime: string;
  lastCheckOkTime: string;
  clickTimestamp: string;
  lastLocalCheckTime: string;
  language: string[];
  lastCheckTime: string;
  geoLat: number;
  geoLong: number;
  tags: string[];
}
