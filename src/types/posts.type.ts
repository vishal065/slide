export type InstagramPostProps = {
  id: string;
  media: string;
  media_url: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM";
  timestamp: Date;
};
