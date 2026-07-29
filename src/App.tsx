import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Volume2, VolumeX, Sparkles, MapPin, 
  ChevronLeft, ChevronRight, X, ShieldCheck,
  Trash2, Copy, Check, Edit3, Sliders,
  Grid, Clapperboard, Landmark, Home, GraduationCap
} from 'lucide-react';
import { audioEngine } from './utils/audio';
import './App.css';

// Line Icon Helper for Filter Bar and Map Pins
const getCategoryIcon = (category: string, size: number = 14) => {
  if (category.includes('02')) return <Clapperboard size={size} strokeWidth={1.8} />;
  if (category.includes('03')) return <Landmark size={size} strokeWidth={1.8} />;
  if (category.includes('04')) return <Home size={size} strokeWidth={1.8} />;
  if (category.includes('05')) return <GraduationCap size={size} strokeWidth={1.8} />;
  return <MapPin size={size} strokeWidth={1.8} />;
};

// Types for State Machine & Hotspots
type SceneState = 'start' | 'intro' | 'masterplan' | 'arrival' | 'oasis';

export interface VideoDetail {
  title: string;
  description: string;
}

export interface CustomPin {
  id: string;
  title: string;
  category: string;
  x: number;
  y: number;
  imagePath?: string;
  videoPath?: string;
  videoPlaylist?: string[];
  videoDetails?: VideoDetail[];
  videoDescriptions?: string[];
  galleryImages?: string[];
  description?: string;
  voiceOverText?: string;
  voiceOverAudio?: string;
}

const DEFAULT_PINS: CustomPin[] = [
  {
    "id": "pin-mc-1",
    "title": "MASPERO MEDIA HUB (NUT)",
    "category": "02. MEDIA AND CREATION",
    "x": 47,
    "y": 42,
    "videoPath": "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/Animated/hf_20260509_162517_17f3736c-68a3-4c99-a8bd-6826277b1174.mp4",
    "videoPlaylist": [
      "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/Animated/hf_20260509_162517_17f3736c-68a3-4c99-a8bd-6826277b1174.mp4",
      "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/Animated/hf_20260509_164337_817b623d-5f02-4227-8188-cc9d103deef9.mp4",
      "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/Animated/hf_20260509_165900_ece4c8f9-da4d-4d9f-b133-04dc62782172.mp4",
      "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/Animated/timelapse.mp4"
    ],
    "videoDetails": [
      {
        "title": "MAIN BROADCAST TOWER",
        "description": "Central satellite uplink node and flagship television production facilities for national and global broadcasting."
      },
      {
        "title": "CREATIVE EDITING SUITES",
        "description": "Post-production suites equipped with color grading consoles and Dolby audio mastering rooms."
      },
      {
        "title": "MEDIA CONTROL ROOM",
        "description": "24/7 newsroom hub and live master control transmission center."
      },
      {
        "title": "PANORAMIC TIMELAPSE",
        "description": "Day-to-night time-lapse showcasing the architectural silhouette of the Maspero Media Complex."
      }
    ],
    "imagePath": "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/freepik__move-the-pyramids-to-the-right-and-make-them-far-b__3418.png",
    "galleryImages": [
      "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/magnific__convert-to-be-daylight-shot-without-changing-anyth__38058.png",
      "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/magnific__artistic-macro-of-ornate-relief-panels-and-palm-si__16504.png",
      "/experience/02-MEDIA-AND-CREATION/NUT-New-Maspero/freepik__move-the-pyramids-to-the-right-and-make-them-far-b__3418.png"
    ],
    "description": "High-density media production, broadcast centers, and digital creation labs.",
    "voiceOverText": "RISING ALONG THE CENTRAL CANAL, THE MASPERO MEDIA HUB SERVES AS THE MASTERPLAN'S FLAGSHIP BROADCAST NEXUS, HOUSING STATE-OF-THE-ART SOUNDSTAGES, LIVE CONTROL ROOMS, AND INTERNATIONAL TRANSMISSION SUITES.",
    "voiceOverAudio": "/experience/voiceovers/maspero_media_hub.mp3"
  },
  {
    "id": "pin-mc-2",
    "title": "STUDIO BACKLOTS",
    "category": "02. MEDIA AND CREATION",
    "x": 52,
    "y": 28,
    "videoPath": "/experience/02-MEDIA-AND-CREATION/studio-back-lots/Animated/hf_20260509_171654_c7065bb9-b1dc-451c-8a13-971d6134644a.mp4",
    "videoPlaylist": [
      "/experience/02-MEDIA-AND-CREATION/studio-back-lots/Animated/hf_20260509_171654_c7065bb9-b1dc-451c-8a13-971d6134644a.mp4",
      "/experience/02-MEDIA-AND-CREATION/studio-back-lots/Animated/hf_20260509_171936_0f84bc58-9e51-462e-b95d-c9eb97f8e78e.mp4",
      "/experience/02-MEDIA-AND-CREATION/studio-back-lots/Animated/hf_20260509_172116_cbe29e24-2d80-4a0b-b539-5914d4bd6b8d.mp4",
      "/experience/02-MEDIA-AND-CREATION/studio-back-lots/Animated/hf_20260509_172636_9570e606-0284-49d8-9e19-93b06ee9d9ae.mp4"
    ],
    "videoDetails": [
      {
        "title": "OUTDOOR FILM SET",
        "description": "Extensive physical backlots customizable for historical, urban, or sci-fi cinematic shoots."
      },
      {
        "title": "SOUNDSTAGE INTERIOR",
        "description": "Acoustically isolated soundstages with motorized rigging and real-time environment projection."
      },
      {
        "title": "VIRTUAL PRODUCTION BACKLOT",
        "description": "Hybrid indoor-outdoor filming zone combining real props with LED virtual background rendering."
      },
      {
        "title": "POST-PRODUCTION HUB",
        "description": "On-set DIT suites and instant footage review stations for directors and cinematographers."
      }
    ],
    "imagePath": "/experience/02-MEDIA-AND-CREATION/studio-back-lots/magnific__backlot-city-set-ultrarealistic-cinematic-shot-of-__45535.png",
    "galleryImages": [
      "/experience/02-MEDIA-AND-CREATION/studio-back-lots/magnific__backlot-city-set-ultrarealistic-cinematic-shot-of-__45535.png",
      "/experience/02-MEDIA-AND-CREATION/studio-back-lots/magnific__desert-film-set-ultrarealistic-shot-of-an-outdoor-__45534.png",
      "/experience/02-MEDIA-AND-CREATION/studio-back-lots/magnific__ai-postproduction-hub-ultrarealistic-cinematic-sho__45537.png"
    ],
    "description": "Next-gen virtual production stages and soundstages equipped with real-time AI background rendering.",
    "voiceOverText": "EXPANDING ACROSS DEDICATED SOUNDSTAGES AND ADAPTABLE OUTDOOR SETS, THE STUDIO BACKLOTS PROVIDE NEXT-GENERATION PRODUCTION STAGES INTEGRATED WITH REAL-TIME VIRTUAL BACKGROUND RENDERING.",
    "voiceOverAudio": "/experience/voiceovers/studio_backlots.mp3"
  },
  {
    "id": "pin-mc-3",
    "title": "AI CREATIVE STUDIOS",
    "category": "02. MEDIA AND CREATION",
    "x": 39,
    "y": 34,
    "videoPath": "/experience/02-MEDIA-AND-CREATION/studios-ai/Animated/hf_20260509_173505_b8410f83-1599-49fb-9a17-15a6c5b09e1d.mp4",
    "videoPlaylist": [
      "/experience/02-MEDIA-AND-CREATION/studios-ai/Animated/hf_20260509_173505_b8410f83-1599-49fb-9a17-15a6c5b09e1d.mp4",
      "/experience/02-MEDIA-AND-CREATION/studios-ai/Animated/hf_20260509_174129_07a2563a-35d8-4cfe-9c68-f8b7aa682327.mp4",
      "/experience/02-MEDIA-AND-CREATION/studios-ai/Animated/hf_20260509_174222_a174b3de-6059-441a-a1fe-c53752c5a6e0.mp4",
      "/experience/02-MEDIA-AND-CREATION/studios-ai/Animated/hf_20260509_174445_457ccbe5-bf5b-43e6-8f8b-0d247eeb569c.mp4"
    ],
    "videoDetails": [
      {
        "title": "NEURAL RENDER LAB",
        "description": "AI-assisted content generation suites specializing in real-time neural render farm compute."
      },
      {
        "title": "AUDIO & SOUND DESIGN",
        "description": "Generative audio synthesis labs for spatial music production and voice cloning."
      },
      {
        "title": "COLOR GRADING LOUNGE",
        "description": "Interactive editing suites equipped with high-dynamic-range OLED monitors."
      },
      {
        "title": "VIRTUAL CHARACTER STUDIO",
        "description": "Digital human creation workstations and real-time motion capture analysis suites."
      }
    ],
    "imagePath": "/experience/02-MEDIA-AND-CREATION/studios-ai/magnific__ultrarealistic-render-of-a-dark-virtual-production__36369.png",
    "galleryImages": [
      "/experience/02-MEDIA-AND-CREATION/studios-ai/magnific__ultrarealistic-render-of-a-dark-virtual-production__36369.png",
      "/experience/02-MEDIA-AND-CREATION/studios-ai/magnific__color-grading-and-liveedit-lounge-img2__16493.png",
      "/experience/02-MEDIA-AND-CREATION/studios-ai/magnific__ultrarealistic-close-lifestyle-shot-inside-an-ai-p__36368.png"
    ],
    "description": "AI-assisted content generation suites, sound design labs, and neural render farms.",
    "voiceOverText": "ENGINEERED FOR THE FUTURE OF DIGITAL STORYTELLING, THE A.I. CREATIVE STUDIOS OFFER HIGH-THROUGHPUT COMPUTING, NEURAL RENDER FARMS, AND IMMERSIVE AUDIO SYNTHESIS SUITES.",
    "voiceOverAudio": "/experience/voiceovers/ai_creative_studios.mp3"
  },
  {
    "id": "pin-mc-4",
    "title": "CREATIVE COMMERCIAL HUB",
    "category": "02. MEDIA AND CREATION",
    "x": 53,
    "y": 82,
    "videoPath": "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/Animated/hf_20260509_162408_b8c5ea0e-a124-4226-b176-4b7f37090f9c.mp4",
    "videoPlaylist": [
      "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/Animated/hf_20260509_162408_b8c5ea0e-a124-4226-b176-4b7f37090f9c.mp4",
      "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/Animated/hf_20260509_162518_6d9a01cc-eb14-418d-83fc-3cf64358b958.mp4",
      "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/Animated/hf_20260509_162705_5e11bb2c-c191-4b26-ba66-7c7cc4e543f5.mp4",
      "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/Animated/hf_20260509_163112_a5ce8252-08cd-4f80-a40a-f4c43664f28c.mp4"
    ],
    "videoDetails": [
      {
        "title": "COMMERCIAL PLAZA",
        "description": "Glass-fronted commercial headquarters housing global advertising agencies and media startups."
      },
      {
        "title": "PODCAST GLASS STUDIO",
        "description": "Transparent broadcast booths overlooking the public promenade for live audio shows."
      },
      {
        "title": "CREATIVE INCUBATOR",
        "description": "Shared co-working lounges and pitch rooms for digital content creators."
      },
      {
        "title": "LIFESTYLE PROMENADE",
        "description": "Alfresco dining and coffee lounges designed for creative networking."
      }
    ],
    "imagePath": "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/magnific__podcast-creators-behindthescenes-in-the-glassfront__45497.png",
    "galleryImages": [
      "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/magnific__podcast-creators-behindthescenes-in-the-glassfront__45497.png",
      "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/magnific__glass-podcast-studio-session-intimate-host-and-gue__45502.png",
      "/experience/02-MEDIA-AND-CREATION/CreatiVe-Commercial/magnific__evening-strollers-couple-reviewing-footage-on-a-la__45503.png"
    ],
    "description": "Mixed-use commercial spaces for creative agencies, media startups, and tech incubators.",
    "voiceOverText": "DESIGNED AS AN INTERACTIVE BUSINESS CONCOURSE, THE CREATIVE COMMERCIAL HUB BRINGS TOGETHER LEADING ADVERTISING AGENCIES, PODCAST GLASS STUDIOS, AND DIGITAL CONTENT INCUBATORS.",
    "voiceOverAudio": "/experience/voiceovers/creative_commercial_hub.mp3"
  },
  {
    "id": "pin-mc-5",
    "title": "MIXED USE MEDIA PLAZA",
    "category": "02. MEDIA AND CREATION",
    "x": 51,
    "y": 64,
    "videoPath": "/experience/02-MEDIA-AND-CREATION/mixed-use/Animated/hf_20260509_164500_150b50c2-de4f-42f8-8489-296c8968b168.mp4",
    "videoPlaylist": [
      "/experience/02-MEDIA-AND-CREATION/mixed-use/Animated/hf_20260509_164500_150b50c2-de4f-42f8-8489-296c8968b168.mp4",
      "/experience/02-MEDIA-AND-CREATION/mixed-use/Animated/hf_20260509_164636_e495c357-dfcb-44d9-a86c-1378454f4840.mp4",
      "/experience/02-MEDIA-AND-CREATION/mixed-use/Animated/hf_20260509_164746_86cfb357-1ecd-4e7a-8c14-808e8d6e18e0.mp4",
      "/experience/02-MEDIA-AND-CREATION/mixed-use/Animated/multi shot.mp4"
    ],
    "videoDetails": [
      {
        "title": "MIXED-USE PLAZA",
        "description": "Dynamic urban concourse featuring outdoor media display screens and retail storefronts."
      },
      {
        "title": "PEDESTRIAN BOULEVARD",
        "description": "Lushly landscaped walkways connecting commercial offices to residential quarters."
      },
      {
        "title": "EVENING MARKET PLACE",
        "description": "Illuminated nighttime gathering plaza for open-air cinema screenings."
      },
      {
        "title": "MULTI-SHOT OVERVIEW",
        "description": "Panoramic camera sweep over the mixed-use architectural precinct."
      }
    ],
    "imagePath": "/experience/02-MEDIA-AND-CREATION/mixed-use/magnific__ultrarealistic-lifestyle-render-of-a-futuristic-re__25971.png",
    "galleryImages": [
      "/experience/02-MEDIA-AND-CREATION/mixed-use/magnific__ultrarealistic-lifestyle-render-of-a-futuristic-re__25971.png",
      "/experience/02-MEDIA-AND-CREATION/mixed-use/magnific__remove-the-futuristic-car__27841.png"
    ],
    "description": "Vibrant urban plaza blending retail, dining, and open-air media screens.",
    "voiceOverText": "ANCHORING THE CREATIVE DISTRICT'S CIVIC LIFE, THE MIXED-USE MEDIA PLAZA COMBINES PEDESTRIAN PROMENADES, OUTDOOR CINEMA SCREENS, AND VIBRANT ALFRESCO DINING HOUSES.",
    "voiceOverAudio": "/experience/voiceovers/mixed_use_media_plaza.mp3"
  },
  {
    "id": "pin-mc-6",
    "title": "MEDIA THEME PARK",
    "category": "02. MEDIA AND CREATION",
    "x": 21,
    "y": 28,
    "videoPath": "/experience/02-MEDIA-AND-CREATION/theme-Park/Animated/hf_20260509_171106_78783c04-771c-43d9-af04-9b7ab3f391e6.mp4",
    "videoPlaylist": [
      "/experience/02-MEDIA-AND-CREATION/theme-Park/Animated/hf_20260509_171106_78783c04-771c-43d9-af04-9b7ab3f391e6.mp4",
      "/experience/02-MEDIA-AND-CREATION/theme-Park/Animated/hf_20260509_172919_7cb3d3f9-a5db-48d1-9da2-961dcb1304ea.mp4",
      "/experience/02-MEDIA-AND-CREATION/theme-Park/Animated/hf_20260509_174403_3a06b9fc-2725-4600-91bd-f89a6f5880ae.mp4",
      "/experience/02-MEDIA-AND-CREATION/theme-Park/Animated/hf_20260509_174925_ae5cd234-e77c-45b3-9663-d1b3021df808.mp4"
    ],
    "videoDetails": [
      {
        "title": "IMMERSIVE ENTERTAINMENT ZONE",
        "description": "Interactive media rides and virtual reality experiences for visitors of all ages."
      },
      {
        "title": "WATERFRONT PROMENADE",
        "description": "Scenic boardwalk lined with interactive digital fountains and laser shows."
      },
      {
        "title": "NIGHTTIME FESTIVAL PLAZA",
        "description": "Vibrant evening festival grounds featuring illuminated media pavilions."
      },
      {
        "title": "FAMILY RECREATION PARK",
        "description": "Green open spaces integrated with digital art installations."
      }
    ],
    "imagePath": "/experience/02-MEDIA-AND-CREATION/theme-Park/magnific__goldenhour-couple-stroll-along-illuminated-waterfr__45512.png",
    "galleryImages": [
      "/experience/02-MEDIA-AND-CREATION/theme-Park/magnific__goldenhour-couple-stroll-along-illuminated-waterfr__45512.png",
      "/experience/02-MEDIA-AND-CREATION/theme-Park/magnific__img1-evening-waterfront-couples-dinner-on-a-lowlev__45507.png",
      "/experience/02-MEDIA-AND-CREATION/theme-Park/magnific__img1-family-picnic-and-playful-children-on-the-lag__45505.png"
    ],
    "description": "Immersive entertainment district featuring interactive VR experiences and media rides.",
    "voiceOverText": "A REVOLUTIONARY ENTERTAINMENT DESTINATION, THE MEDIA THEME PARK IMMERSES VISITORS IN INTERACTIVE VIRTUAL REALITY ATTRACTIONS, LASER FOUNTAIN SHOWS, AND MEDIA SCULPTURE GARDENS.",
    "voiceOverAudio": "/experience/voiceovers/media_theme_park.mp3"
  },
  {
    "id": "pin-it-1",
    "title": "THE BEACON TOWER",
    "category": "03. INFLUENCE AND TOURISM",
    "x": 36,
    "y": 49,
    "videoPath": "/experience/03-INFLUENCE-AND-TOURISIM/The-Beacon/Animated/hf_20260509_105704_42ca4d0d-004e-4a4b-8ed1-1de97b771f75.mp4",
    "videoPlaylist": [
      "/experience/03-INFLUENCE-AND-TOURISIM/The-Beacon/Animated/hf_20260509_105704_42ca4d0d-004e-4a4b-8ed1-1de97b771f75.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/The-Beacon/Animated/hf_20260509_115241_0dfd9148-bb5c-480c-82cf-1debad67af83.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/The-Beacon/Animated/hf_20260509_115617_b44dc7ce-6840-4d70-9dfb-4ed288daf724.mp4"
    ],
    "videoDetails": [
      {
        "title": "THE BEACON TOWER",
        "description": "Landmark architectural spire offering 360-degree views of Media City and ancient pyramids."
      },
      {
        "title": "OBSERVATION DECK",
        "description": "Glass-floored sky deck providing visitors with panoramic views across the Nile delta."
      },
      {
        "title": "SPIRE ILLUMINATION",
        "description": "Nighttime architectural lighting show visible across the entire Giza masterplan."
      }
    ],
    "imagePath": "/experience/03-INFLUENCE-AND-TOURISIM/The-Beacon/magnific__style-raw-ar-169-v-61-q-2ultrarealistic-cinematic-__95421.png",
    "galleryImages": [
      "/experience/03-INFLUENCE-AND-TOURISIM/The-Beacon/magnific__style-raw-ar-169-v-61-q-2ultrarealistic-cinematic-__95421.png",
      "/experience/03-INFLUENCE-AND-TOURISIM/The-Beacon/magnific__add-real-local-egyptian-people-to-the-scene-with-d__98421.png"
    ],
    "description": "Architectural landmark tower and public observatory overlooking Giza Media City.",
    "voiceOverText": "STAND-OUT ARCHITECTURE OVERLOOKING THE ANCIENT PYRAMIDS, THE BEACON TOWER FEATURES A THREE-HUNDRED-SIXTY-DEGREE GLASS OBSERVATION DECK AND NIGHTTIME ARCHITECTURAL LIGHT SHOWS.",
    "voiceOverAudio": "/experience/voiceovers/the_beacon_tower.mp3"
  },
  {
    "id": "pin-it-2",
    "title": "THE LOOKOUT OBSERVATORY",
    "category": "03. INFLUENCE AND TOURISM",
    "x": 25,
    "y": 36,
    "videoPath": "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/Animated/hf_20260509_163131_f4c0a9f6-3584-4fc0-b909-653839c80941.mp4",
    "videoPlaylist": [
      "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/Animated/hf_20260509_163131_f4c0a9f6-3584-4fc0-b909-653839c80941.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/Animated/hf_20260509_164145_5780db57-e7fe-42a1-ab8a-77a7db786e46.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/Animated/hf_20260509_164919_1f69b15a-b4f6-432a-a15c-a35b45b9be86.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/Animated/hf_20260509_165647_96ab64e9-5445-44ca-a52d-2d6a8ec3e342 (1).mp4"
    ],
    "videoDetails": [
      {
        "title": "LOOKOUT TERRACE",
        "description": "Elevated cliffside terrace framed by monumental limestone architecture overlooking the horizon."
      },
      {
        "title": "SUNSET OBSERVATORY",
        "description": "Rooftop lounge where visitors gather during golden hour to view the Pyramids."
      },
      {
        "title": "EXHIBITION CORRIDOR",
        "description": "Interior gallery displaying historical Egyptian artifacts and spatial media art."
      },
      {
        "title": "PANORAMIC CRANE SHOT",
        "description": "Ascending vertical camera shot revealing the scale of the lookout plaza."
      }
    ],
    "imagePath": "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/ChatGPT Image May 9, 2026, 05_48_31 PM.png",
    "galleryImages": [
      "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/Firefly_Gemini Flash_Ultra-realistic cinematic rooftop terrace at The Lookout, overlooking the desert hori 760309.png",
      "/experience/03-INFLUENCE-AND-TOURISIM/The-lookout/Firefly_Ultra-realistic cinematic shot at The Lookout showing a monumental rectangular limest 53603.png"
    ],
    "description": "Panoramic elevated vantage point offering sweeping views of the Nile and Giza pyramids.",
    "voiceOverText": "PERCHED AT AN ELEVATED CLIFFSIDE VANTAGE POINT, THE LOOKOUT OBSERVATORY OFFERS SUNSET LOUNGES, HISTORICAL EXHIBITION GALLERIES, AND SWEEPING VIEWS OF THE GIZA PLATEAU.",
    "voiceOverAudio": "/experience/voiceovers/the_lookout_observatory.mp3"
  },
  {
    "id": "pin-it-3",
    "title": "CULTURAL PARK EXPERIENCE",
    "category": "03. INFLUENCE AND TOURISM",
    "x": 19,
    "y": 54,
    "videoPath": "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Park-xperience/Animated/hf_20260508_164049_1ac46df4-2832-472e-9cf4-9a9974377cb5.mp4",
    "videoPlaylist": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Park-xperience/Animated/hf_20260508_164049_1ac46df4-2832-472e-9cf4-9a9974377cb5.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Park-xperience/Animated/magnific_smooth-lateral-tracking-shot-camera-gliding-sidewa_kling_1080p_16-9_24fps_18067.mp4"
    ],
    "videoDetails": [
      {
        "title": "OPEN-AIR AMPHITHEATRE",
        "description": "Natural stone seating bowl hosting outdoor concerts, film premieres, and theatrical plays."
      },
      {
        "title": "DIGITAL SCULPTURE GARDEN",
        "description": "Interactive art garden featuring projection-mapped sculptures."
      }
    ],
    "imagePath": "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Park-xperience/hf_20260507_101141_8159609f-045c-442b-826e-c2a029084065.png",
    "galleryImages": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Park-xperience/hf_20260507_101141_8159609f-045c-442b-826e-c2a029084065.png",
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Park-xperience/hf_20260507_102218_75555c0b-f70b-4d22-91cf-e9211bb144a9.png"
    ],
    "description": "Landscaped public park with open-air amphitheatres and digital sculpture gardens.",
    "voiceOverText": "INTEGRATING NATURE WITH SPATIAL MEDIA ART, THE CULTURAL PARK FEATURES NATURAL STONE AMPHITHEATRES FOR LIVE PERFORMANCES AND PROJECTION-MAPPED SCULPTURE GARDENS.",
    "voiceOverAudio": "/experience/voiceovers/cultural_park_experience.mp3"
  },
  {
    "id": "pin-it-4",
    "title": "CULTURAL VILLAGE",
    "category": "03. INFLUENCE AND TOURISM",
    "x": 29,
    "y": 64,
    "videoPath": "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Village/Animated/hf_20260508_160817_5b2d2ebf-d421-4c4a-9464-7f91f62fbddc.mp4",
    "videoPlaylist": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Village/Animated/hf_20260508_160817_5b2d2ebf-d421-4c4a-9464-7f91f62fbddc.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Village/Animated/hf_20260508_162438_2eb3bcc3-7639-4dfd-b58b-0c11b53f63ef.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Village/Animated/hf_20260508_162958_fa2a3fc5-ead4-412c-b258-5d4bed229bc9.mp4"
    ],
    "videoDetails": [
      {
        "title": "HERITAGE CRAFT PAVILIONS",
        "description": "Artisan workshops showcasing traditional Egyptian crafts, glassblowing, and weaving."
      },
      {
        "title": "CULTURAL EXHIBITION HALL",
        "description": "Spacious gallery celebrating Egypt's cinema and broadcast heritage."
      },
      {
        "title": "HERITAGE COURTYARDS",
        "description": "Traditional limestone arcades and shaded outdoor artisan pavilions."
      }
    ],
    "imagePath": "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Village/magnific__photorealistic-cinematic-still-frame-shot-on-arri-__90702.png",
    "galleryImages": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Village/magnific__photorealistic-cinematic-still-frame-shot-on-arri-__90702.png",
      "/experience/03-INFLUENCE-AND-TOURISIM/Cultular-Village/ChatGPT Image May 8, 2026, 07_23_19 PM (2).png"
    ],
    "description": "Heritage hub showcasing Egyptian crafts, traditional arts, and media exhibitions.",
    "voiceOverText": "CELEBRATING EGYPTIAN HERITAGE AND CRAFTSMANSHIP, THE CULTURAL VILLAGE BRINGS TRADITIONAL ARTISAN WORKSHOPS, CRAFT PAVILIONS, AND MEDIA EXHIBITION HALLS TO LIFE.",
    "voiceOverAudio": "/experience/voiceovers/cultural_village.mp3"
  },
  {
    "id": "pin-it-5",
    "title": "LUXURY HOSPITALITY & HOTEL",
    "category": "03. INFLUENCE AND TOURISM",
    "x": 66,
    "y": 83,
    "videoPath": "/experience/03-INFLUENCE-AND-TOURISIM/Luxury-Hotel/Animated/hf_20260509_174603_e9b865c2-096f-4333-85ee-5626ec481b38.mp4",
    "videoPlaylist": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Luxury-Hotel/Animated/hf_20260509_174603_e9b865c2-096f-4333-85ee-5626ec481b38.mp4"
    ],
    "videoDetails": [
      {
        "title": "LUXURY HOTEL TOWER",
        "description": "5-star boutique resort tower offering VIP suites and executive conference halls."
      }
    ],
    "imagePath": "/experience/03-INFLUENCE-AND-TOURISIM/Luxury-Hotel/Firefly_Gemini Flash_Use the provided masterplan render as the fixed base. Create a cinematic semi-aerial  856347 (1).png",
    "galleryImages": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Luxury-Hotel/Firefly_Gemini Flash_Use the provided masterplan render as the fixed base. Create a cinematic semi-aerial  856347 (1).png"
    ],
    "description": "5-star boutique hospitality tower catering to international media executives and VIP guests.",
    "voiceOverText": "A FIVE-STAR RESORT TOWER CATERING TO GLOBAL MEDIA EXECUTIVES, LUXURY HOSPITALITY OFFERS EXCLUSIVE VIP SUITES, EXECUTIVE CONFERENCE SPAS, AND PANORAMIC LAGOON VIEWS.",
    "voiceOverAudio": "/experience/voiceovers/luxury_hospitality_hotel.mp3"
  },
  {
    "id": "pin-it-6",
    "title": "RESORT COMMUNITY",
    "category": "03. INFLUENCE AND TOURISM",
    "x": 44,
    "y": 73,
    "videoPath": "/experience/03-INFLUENCE-AND-TOURISIM/Resort-community/Animated/hf_20260509_181249_faacee63-22d2-482a-a109-776f97e89454.mp4",
    "videoPlaylist": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Resort-community/Animated/hf_20260509_181249_faacee63-22d2-482a-a109-776f97e89454.mp4",
      "/experience/03-INFLUENCE-AND-TOURISIM/Resort-community/Animated/hf_20260509_182915_5adfd466-05a9-4b84-a13c-ad7ed66e3a46.mp4"
    ],
    "videoDetails": [
      {
        "title": "WATERFRONT RESORT VILLAS",
        "description": "Exclusive waterfront villas integrated with private boat docks and lagoons."
      },
      {
        "title": "PANORAMIC RESORT FLYOVER",
        "description": "Aerial flyover capturing the full scale of the luxury resort enclave."
      }
    ],
    "imagePath": "/experience/03-INFLUENCE-AND-TOURISIM/Resort-community/magnific_cinematic-photorealistic-_2940447843.png",
    "galleryImages": [
      "/experience/03-INFLUENCE-AND-TOURISIM/Resort-community/magnific_cinematic-photorealistic-_2940447843.png",
      "/experience/03-INFLUENCE-AND-TOURISIM/Resort-community/Firefly_Gemini Flash_Ultra-realistic cinematic aerial shot of a luxury resort district integrated into the 252359.png"
    ],
    "description": "Waterfront luxury resort with private lagoons and exclusive wellness amenities.",
    "voiceOverText": "FRAMED BY PRIVATE WATERFRONT LAGOONS, THE RESORT COMMUNITY FEATURES EXCLUSIVE BOUTIQUE VILLAS, INTEGRATED BOAT DOCKS, AND SERENE WELLNESS AMENITIES.",
    "voiceOverAudio": "/experience/voiceovers/resort_community.mp3"
  },

  {
    "id": "pin-rl-1",
    "title": "LUXURY GOLF COMMUNITY",
    "category": "04. RESIDENTIAL AND LIVING",
    "x": 78,
    "y": 58,
    "videoPath": "/experience/04-RESIDENTIAL-AND-LIVING/Golf-Course/Animated/magnific_camera-orbit-around-the-g_2948764542.mp4",
    "videoPlaylist": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Golf-Course/Animated/magnific_camera-orbit-around-the-g_2948764542.mp4",
      "/experience/04-RESIDENTIAL-AND-LIVING/Golf-Course/Animated/magnific_create-a-video_2948714197.mp4",
      "/experience/04-RESIDENTIAL-AND-LIVING/Golf-Course/Animated/magnific_create-a-video_2948749691.mp4"
    ],
    "videoDetails": [
      {
        "title": "CHAMPIONSHIP GOLF COURSE",
        "description": "18-hole championship golf course surrounded by lush green fairways and luxury estates."
      },
      {
        "title": "FAIRWAY VILLAS",
        "description": "Low-rise luxury villas with direct golf course views and swimming pools."
      },
      {
        "title": "PANORAMIC FAIRWAY FLYOVER",
        "description": "Sweeping aerial flyover across the fairways toward the horizon."
      }
    ],
    "imagePath": "/experience/04-RESIDENTIAL-AND-LIVING/Golf-Course/magnific_keep-the-image-100-the-sa_2948471881.jpeg",
    "galleryImages": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Golf-Course/magnific_keep-the-image-100-the-sa_2948471881.jpeg",
      "/experience/04-RESIDENTIAL-AND-LIVING/Golf-Course/magnific_keep-the-image-100-the-sa_2948476115.jpeg"
    ],
    "description": "Exclusive resort living, 18-hole championship golf course, and private luxury villas.",
    "voiceOverText": "FRAMED BY LUSH FAIRWAYS AND PRIVATE ESTATE GROUNDS, THE LUXURY GOLF COMMUNITY OFFERS RESORT-STYLE LIVING ANCHORED BY AN EIGHTEEN-HOLE CHAMPIONSHIP COURSE.",
    "voiceOverAudio": "/experience/voiceovers/luxury_golf_community.mp3"
  },
  {
    "id": "pin-rl-2",
    "title": "LOW-DENSITY LUXURY COMMUNITY",
    "category": "04. RESIDENTIAL AND LIVING",
    "x": 78,
    "y": 35,
    "videoPath": "/experience/04-RESIDENTIAL-AND-LIVING/Low-Density-Luxury-Community/Animated/hf_20260509_143914_63e0a234-0a5f-4f68-942a-d259fbf0230a.mp4",
    "videoPlaylist": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Low-Density-Luxury-Community/Animated/hf_20260509_143914_63e0a234-0a5f-4f68-942a-d259fbf0230a.mp4",
      "/experience/04-RESIDENTIAL-AND-LIVING/Low-Density-Luxury-Community/Animated/hf_20260509_150116_50717ec6-526c-4616-a7a5-bd8f9572833b.mp4"
    ],
    "videoDetails": [
      {
        "title": "EXECUTIVE MANSIONS",
        "description": "Private gated neighborhood of custom luxury mansions set in mature gardens."
      },
      {
        "title": "PRIVATE BOTANICAL GARDENS",
        "description": "Landscaped residential parks and quiet walking trails for estate homeowners."
      }
    ],
    "imagePath": "/experience/04-RESIDENTIAL-AND-LIVING/Low-Density-Luxury-Community/magnific_use-the-provided-image-on_2952088133.png",
    "galleryImages": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Low-Density-Luxury-Community/magnific_use-the-provided-image-on_2952088133.png"
    ],
    "description": "Private gated neighborhood of executive mansions and lush private gardens.",
    "voiceOverText": "NESTLED WITHIN QUIET BOTANICAL PARKS, THE LOW-DENSITY LUXURY COMMUNITY PROVIDES GATED SANCTUARY LIVING WITH CUSTOM EXECUTIVE MANSIONS AND MATURE PRIVATE GARDENS.",
    "voiceOverAudio": "/experience/voiceovers/low_density_luxury_community.mp3"
  },
  {
    "id": "pin-rl-3",
    "title": "MID-HIGH DENSITY COMMUNITY",
    "category": "04. RESIDENTIAL AND LIVING",
    "x": 71,
    "y": 44,
    "videoPath": "/experience/04-RESIDENTIAL-AND-LIVING/Mid-High-Density-Community/Animated/hf_20260509_131437_b05869ba-4a10-47fe-a413-68195dd8ab54.mp4",
    "videoPlaylist": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Mid-High-Density-Community/Animated/hf_20260509_131437_b05869ba-4a10-47fe-a413-68195dd8ab54.mp4",
      "/experience/04-RESIDENTIAL-AND-LIVING/Mid-High-Density-Community/Animated/magnific_increase-qulity-to-4k_2951703846.mp4",
      "/experience/04-RESIDENTIAL-AND-LIVING/Mid-High-Density-Community/Animated/magnific_smooth-orbital-movement-c_2951731003.mp4"
    ],
    "videoDetails": [
      {
        "title": "MID-RISE RESIDENTIAL BLOCKS",
        "description": "Modern urban apartments with spacious balconies and smart energy integration."
      },
      {
        "title": "CENTRAL RESIDENT COURTYARD",
        "description": "Shaded inner courtyards featuring children's play areas and community pools."
      },
      {
        "title": "BALCONY ORBITAL SHOT",
        "description": "Smooth camera glide showcasing the architectural facade and private balconies."
      }
    ],
    "imagePath": "/experience/04-RESIDENTIAL-AND-LIVING/Mid-High-Density-Community/magnific_use-the-provided-image-on_2951680488.png",
    "galleryImages": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Mid-High-Density-Community/magnific_use-the-provided-image-on_2951680488.png"
    ],
    "description": "Modern residential complexes with green courtyards and smart home infrastructure.",
    "voiceOverText": "DESIGNED FOR MODERN URBAN COMFORT, THE MID-HIGH DENSITY COMMUNITY BLENDS LIGHT-FILLED APARTMENT BLOCKS WITH SHADED GREEN COURTYARDS AND INTEGRATED SMART HOME INFRASTRUCTURE.",
    "voiceOverAudio": "/experience/voiceovers/mid_high_density_community.mp3"
  },
  {
    "id": "pin-rl-4",
    "title": "HIGH-DENSITY APT COMMUNITY",
    "category": "04. RESIDENTIAL AND LIVING",
    "x": 71,
    "y": 29,
    "videoPath": "/experience/04-RESIDENTIAL-AND-LIVING/High-Density-Apt-Community/Animated/magnific_camera-orbit-around-the-r_2951629668.mp4",
    "videoPlaylist": [
      "/experience/04-RESIDENTIAL-AND-LIVING/High-Density-Apt-Community/Animated/magnific_camera-orbit-around-the-r_2951629668.mp4",
      "/experience/04-RESIDENTIAL-AND-LIVING/High-Density-Apt-Community/Animated/magnific_create-a-video_2951601374.mp4"
    ],
    "videoDetails": [
      {
        "title": "URBAN HIGH-RISE TOWERS",
        "description": "Contemporary residential towers catering to media professionals and young families."
      },
      {
        "title": "SKY LOUNGE & GYM",
        "description": "Top-floor fitness suites and resident lounges with city skyline vistas."
      }
    ],
    "imagePath": "/experience/04-RESIDENTIAL-AND-LIVING/High-Density-Apt-Community/magnific_lock-all-materials-and-do_2951400089.png",
    "galleryImages": [
      "/experience/04-RESIDENTIAL-AND-LIVING/High-Density-Apt-Community/magnific_lock-all-materials-and-do_2951400089.png"
    ],
    "description": "Contemporary high-rise apartments designed for media professionals and urban residents.",
    "voiceOverText": "RISING ALONG THE SKYLINE, THE HIGH-DENSITY APARTMENT COMMUNITY CATERS TO MEDIA PROFESSIONALS WITH CONTEMPORARY HIGH-RISE TOWERS, PANORAMIC SKY LOUNGES, AND URBAN AMENITIES.",
    "voiceOverAudio": "/experience/voiceovers/high_density_apt_community.mp3"
  },
  {
    "id": "pin-rl-5",
    "title": "NEIGHBORHOOD COMMUNITY FACILITY",
    "category": "04. RESIDENTIAL AND LIVING",
    "x": 54,
    "y": 38,
    "videoPath": "/experience/04-RESIDENTIAL-AND-LIVING/Neighborhood-Community-Facility/Animated/hf_20260509_150239_c785643a-4fa3-4bed-9e38-2a7f48abfc95.mp4",
    "videoPlaylist": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Neighborhood-Community-Facility/Animated/hf_20260509_150239_c785643a-4fa3-4bed-9e38-2a7f48abfc95.mp4",
      "/experience/04-RESIDENTIAL-AND-LIVING/Semi-Aerials/Animated/hf_20260509_182000_44db7329-b525-4c24-b128-ef5bc4f7060b.mp4"
    ],
    "videoDetails": [
      {
        "title": "CIVIC & HEALTHCARE CENTER",
        "description": "Community medical clinic, fitness center, and local administrative offices."
      },
      {
        "title": "COMMUNITY SPORTS COMPLEX",
        "description": "Multi-sport indoor courts and neighborhood swimming facility."
      }
    ],
    "imagePath": "/experience/04-RESIDENTIAL-AND-LIVING/Neighborhood-Community-Facility/magnific_use-the-provided-image-on_2952174039.png",
    "galleryImages": [
      "/experience/04-RESIDENTIAL-AND-LIVING/Neighborhood-Community-Facility/magnific_use-the-provided-image-on_2952174039.png"
    ],
    "description": "Central civic hub containing healthcare, sports complexes, and community centers.",
    "voiceOverText": "SERVING AS THE SOCIAL HEART FOR RESIDENTS, THE NEIGHBORHOOD COMMUNITY FACILITY BRINGS TOGETHER WELLNESS CLINICS, INDOOR SPORTS COMPLEXES, AND ACTIVE NEIGHBORHOOD GATHERING HUBS.",
    "voiceOverAudio": "/experience/voiceovers/neighborhood_community_facility.mp3"
  },
  {
    "id": "pin-ig-1",
    "title": "MEDIA CITY UNIVERSITY",
    "category": "05. INFRA AND GENERAL SPACES",
    "x": 62,
    "y": 66,
    "videoPath": "/experience/05-INFRA-AND-GENERAL-SPACES/University/Animated/hf_20260509_163418_76c079ef-5d44-4ca2-90da-d913e1a22140 (1).mp4",
    "videoPlaylist": [
      "/experience/05-INFRA-AND-GENERAL-SPACES/University/Animated/hf_20260509_163418_76c079ef-5d44-4ca2-90da-d913e1a22140 (1).mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/University/Animated/hf_20260509_164306_de0bcab3-1aaf-4ed4-9b56-8fc81a10ca10.mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/University/Animated/hf_20260509_170714_f40742c7-7c66-418e-881d-16679a1b6b19.mp4"
    ],
    "videoDetails": [
      {
        "title": "MAIN ACADEMIC PLAZA",
        "description": "Central student gathering boulevard framed by modern limestone architecture, providing open discussion spaces and direct vistas toward heritage monuments."
      },
      {
        "title": "INNOVATION & ART COURTYARD",
        "description": "Open-air collaborative study spaces designed for digital media, fine arts, and cinema creation where students interact and develop joint creative projects."
      },
      {
        "title": "SPATIAL AI & MEDIA LABS",
        "description": "High-tech laboratory wing housing real-time neural rendering clusters and advanced spatial media engineering suites for academic research."
      }
    ],
    "imagePath": "/experience/05-INFRA-AND-GENERAL-SPACES/University/hf_20260507_142720_178de512-10e3-48cc-aae7-0aa4bbcfc55d (1).jpg",
    "galleryImages": [
      "/experience/05-INFRA-AND-GENERAL-SPACES/University/hf_20260507_142720_178de512-10e3-48cc-aae7-0aa4bbcfc55d (1).jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/University/magnific__-human-accurate-physical-facial-details-and-remove__29916.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/University/magnific__50mm-standard-human-eye-intimate-__29917.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/University/magnific_add-small-villas-in-the-b_2952555037.jpg"
    ],
    "description": "World-class academic institution specializing in digital media, cinema, spatial computing, and AI engineering.",
    "voiceOverText": "POSITIONED AT THE CREATIVE HEART OF THE MASTERPLAN, MEDIA CITY UNIVERSITY NURTURES THE NEXT GENERATION OF CINEMATOGRAPHERS, AI ENGINEERS, AND SPATIAL MEDIA ARCHITECTS.",
    "voiceOverAudio": "/experience/voiceovers/media_city_university.mp3"
  },
  {
    "id": "pin-ig-2",
    "title": "TECH & RESEARCH INSTITUTE",
    "category": "05. INFRA AND GENERAL SPACES",
    "x": 30,
    "y": 26,
    "videoPath": "/experience/05-INFRA-AND-GENERAL-SPACES/institute/Animated/hf_20260508_175000_57ede41d-7b9d-4900-b63f-7b4ee1c952f4 (1).mp4",
    "videoPlaylist": [
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/Animated/hf_20260508_175000_57ede41d-7b9d-4900-b63f-7b4ee1c952f4 (1).mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/Animated/hf_20260509_091016_4ce16602-9dae-4582-aedf-8eeda76e9ac8.mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/Animated/hf_20260509_100250_cd52f6ee-d5d8-413a-8ffd-6756ba615ff9.mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/Animated/hf_20260509_101738_130bf1a9-59c9-426a-809f-94df3e6ae65c.mp4"
    ],
    "videoDetails": [
      {
        "title": "VIRTUAL PRODUCTION STAGE",
        "description": "Next-generation virtual production stage equipped with high-density LED walls and real-time camera tracking for instant background rendering."
      },
      {
        "title": "LIBRARY AREA",
        "description": "a place where you can read, follow the knowledge at its place, uniquely. a place where you can read, follow the knowledge at its place, uniquely."
      },
      {
        "title": "NEURAL COMPUTING FARM",
        "description": "High-performance GPU cluster providing real-time neural rendering and cloud compute power for studio scale productions."
      },
      {
        "title": "AUTONOMOUS TECH COURTYARD",
        "description": "Outdoor testing promenade for autonomous camera drones, robotics capture, and mobile spatial recording rigs."
      }
    ],
    "imagePath": "/experience/05-INFRA-AND-GENERAL-SPACES/institute/magnific__enhance__70998.jpg",
    "galleryImages": [
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/magnific__enhance__70998.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/magnific__keep-the-image-100-in-the-reference-the-same-camer__71000.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/magnific__keep-the-image-100-the-same-img1-same-camera-angel__70999.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/institute/magnific__use-the-provided-image-only-as-a-refrence-with-rep__49039.jpg"
    ],
    "description": "Advanced R&D center for emerging spatial computing, real-time VFX, and generative AI research.",
    "voiceOverText": "WELCOME TO THE TECH & RESEARCH INSTITUTE — AN ADVANCED SANCTUARY OF EMPOWERING GENERATIVE AI, REAL-TIME VIRTUAL PRODUCTION, AND SPATIAL COMPUTING.",
    "voiceOverAudio": "/experience/voiceovers/tech_research_institute.mp3"
  },
  {
    "id": "pin-ig-3",
    "title": "SHARED ASSETS & UTILITIES",
    "category": "05. INFRA AND GENERAL SPACES",
    "x": 78,
    "y": 81,
    "videoPath": "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/Animated/hf_20260509_094546_672add0e-4b06-4c9d-9a37-2024eb56952d.mp4",
    "videoPlaylist": [
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/Animated/hf_20260509_094546_672add0e-4b06-4c9d-9a37-2024eb56952d.mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/Animated/hf_20260509_115545_6a12e129-d3c1-4ee6-bf54-16f0c38a4212.mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/Animated/hf_20260509_120406_c6b5ecb4-12b3-4d27-bab1-182f8b362774.mp4",
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/Animated/hf_20260509_121247_bca68581-c0bd-42e4-8a8b-d61033ea9755.mp4"
    ],
    "videoDetails": [
      {
        "title": "SMART ENERGY SUBSTATION",
        "description": "Clean energy management hub powering high-intensity studio lighting, server racks, and spatial computing hardware across Media City."
      },
      {
        "title": "HIGH-SPEED FIBER BACKBONE",
        "description": "Ultra-low latency optical networking core connecting studio backlots, editing suites, and transmission towers seamlessly."
      },
      {
        "title": "ECO-WATER RECYCLING CENTER",
        "description": "Closed-loop water treatment facility supporting green landscapes and sustainable cooling infrastructure."
      },
      {
        "title": "EQUIPMENT LOGISTICS HUB",
        "description": "Automated storage and transit terminal for rapid dispatch of filming equipment and production rigs."
      }
    ],
    "imagePath": "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/magnific__camera-drone-wide-angle-__50567.jpg",
    "galleryImages": [
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/magnific__camera-drone-wide-angle-__50567.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/magnific__keep-the-image-100-in-the-reference-the-same-camer__75870.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/magnific__keep-the-image-100-in-the-reference-the-same-camer__75871.jpg",
      "/experience/05-INFRA-AND-GENERAL-SPACES/Shared-Assets/magnific__replace-arabs-with-foreigners__59443.jpg"
    ],
    "description": "Central smart grid hub, eco-water treatment, and high-speed fiber data backbone servicing Media City.",
    "voiceOverText": "POWERING THE ENTIRE ECOSYSTEM WITH ZERO-CARBON ENERGY, HIGH-SPEED FIBER DATA, AND CLOSED-LOOP RECYCLING, SHARED ASSETS KEEP MEDIA CITY RUNNING AT PEAK PERFORMANCE DAY AND NIGHT.",
    "voiceOverAudio": "/experience/voiceovers/shared_assets_utilities.mp3"
  }
];

export default function App() {
  const [scene, setScene] = useState<SceneState>('start');
  const [isMuted, setIsMuted] = useState(false);
  const [activeModal, setActiveModal] = useState<CustomPin | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Category Layer Filter State (Default set to Tourism)
  const [selectedCategory, setSelectedCategory] = useState<string>('03. INFLUENCE AND TOURISM');

  // Video Playlist & 0.5s Black Fadeout State
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Pinning Editor State with Automatic LocalStorage Persistence & Media Hydration
  const [pins, setPins] = useState<CustomPin[]>(() => {
    const saved = localStorage.getItem('opet_media_city_pins');
    if (saved) {
      try {
        const parsed: CustomPin[] = JSON.parse(saved);
        return DEFAULT_PINS.map(defaultP => {
          const p = parsed.find(item => item.id === defaultP.id);
          if (!p) return defaultP;
          return {
            ...defaultP,
            x: typeof p.x === 'number' ? p.x : defaultP.x,
            y: typeof p.y === 'number' ? p.y : defaultP.y,
          };
        });
      } catch (e) {
        console.error('Failed to load saved pins', e);
      }
    }
    return DEFAULT_PINS;
  });

  const handleOpenPinModal = (pin: CustomPin) => {
    // Immediately stop Intro VO 2 (and Intro VO 1) if active when opening a pin
    if (vo2Ref.current) {
      vo2Ref.current.pause();
      vo2Ref.current = null;
      setShowMasterplanSubtitle(false);
    }
    if (vo1Ref.current) {
      vo1Ref.current.pause();
      vo1Ref.current = null;
    }

    const freshPin = DEFAULT_PINS.find(p => p.id === pin.id) || pin;
    setActiveModal(freshPin);
    setCurrentVideoIdx(0);
    setIsVideoFading(false);
    setLightboxImg(null);
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>, playlistLength: number) => {
    const video = e.currentTarget;
    if (playlistLength <= 1) return;
    
    // Trigger 0.5s fade out 0.5s before video ends
    if (video.duration && video.currentTime >= video.duration - 0.5 && !isVideoFading) {
      setIsVideoFading(true);
      setTimeout(() => {
        setCurrentVideoIdx((prev) => (prev + 1) % playlistLength);
        setIsVideoFading(false);
      }, 500);
    }
  };

  const handleNextVideo = (playlistLength: number) => {
    if (isVideoFading || playlistLength <= 1) return;
    setIsVideoFading(true);
    setTimeout(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % playlistLength);
      setIsVideoFading(false);
    }, 400);
  };

  const handlePrevVideo = (playlistLength: number) => {
    if (isVideoFading || playlistLength <= 1) return;
    setIsVideoFading(true);
    setTimeout(() => {
      setCurrentVideoIdx((prev) => (prev - 1 + playlistLength) % playlistLength);
      setIsVideoFading(false);
    }, 400);
  };

  const [isPinEditorOpen, setIsPinEditorOpen] = useState(false);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // Save pins to localStorage automatically whenever modified
  useEffect(() => {
    localStorage.setItem('opet_media_city_pins', JSON.stringify(pins));
  }, [pins]);

  // Background Media Preloader for Instant Video & Visual Display
  useEffect(() => {
    const preloadMedia = () => {
      DEFAULT_PINS.forEach((pin) => {
        if (pin.imagePath) {
          const img = new Image();
          img.src = encodeURI(pin.imagePath);
        }
        if (pin.galleryImages) {
          pin.galleryImages.forEach((url) => {
            const img = new Image();
            img.src = encodeURI(url);
          });
        }
        if (pin.videoPlaylist && pin.videoPlaylist.length > 0) {
          pin.videoPlaylist.forEach((vUrl) => {
            const v = document.createElement('video');
            v.preload = 'auto';
            v.src = encodeURI(vUrl);
          });
        }
      });
    };

    // Run preloader after initial render
    const timer = setTimeout(preloadMedia, 500);
    return () => clearTimeout(timer);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio Sync with Scene State
  useEffect(() => {
    audioEngine.playSceneAmbience(scene);
  }, [scene]);

  // Higgsfield Voice Over Audio Player for active pin modal (matching intro VO level & music ducking)
  const pinAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (activeModal) {
      if (vo2Ref.current) {
        vo2Ref.current.pause();
        vo2Ref.current = null;
        setShowMasterplanSubtitle(false);
      }
      if (vo1Ref.current) {
        vo1Ref.current.pause();
        vo1Ref.current = null;
      }
    }

    if (pinAudioRef.current) {
      pinAudioRef.current.pause();
      pinAudioRef.current = null;
      audioEngine.restoreMusic();
    }

    if (activeModal && !isMuted && activeModal.voiceOverAudio) {
      audioEngine.duckForVoiceover();
      const audio = new Audio(activeModal.voiceOverAudio);
      audio.volume = 0.40;
      pinAudioRef.current = audio;

      audio.onended = () => {
        audioEngine.restoreMusic();
      };

      audio.play().catch((err) => {
        audioEngine.restoreMusic();
        console.warn('Audio playback prevented or interrupted:', err);
      });
    }

    return () => {
      if (pinAudioRef.current) {
        pinAudioRef.current.pause();
        pinAudioRef.current = null;
        audioEngine.restoreMusic();
      }
    };
  }, [activeModal, isMuted]);

  // Audio Mute toggle
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioEngine.setMuted(nextMute);
  };

  const vo1Ref = useRef<HTMLAudioElement | null>(null);
  const vo2Ref = useRef<HTMLAudioElement | null>(null);
  const [showMasterplanSubtitle, setShowMasterplanSubtitle] = useState(false);

  // 1. INTRO SCENE: Video Panning + Voiceover 1 ("Welcome to Media City...")
  useEffect(() => {
    if (scene === 'intro') {
      setShowMasterplanSubtitle(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }

      // Voiceover 1: "Welcome to Media City — an extraordinary sanctuary of innovation."
      if (!isMuted) {
        audioEngine.duckForVoiceover();
        const vo1 = new Audio('/assets/vo_intro_step1_v2.mp3');
        vo1.volume = 0.40;
        
        // When Voiceover 1 finishes 100% -> Freeze video on last frame & reveal Masterplan pins!
        vo1.onended = () => {
          audioEngine.restoreMusic();
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setScene('masterplan');
        };

        vo1.play().catch(() => {});
        vo1Ref.current = vo1;
      } else {
        // Fallback timer if muted
        const timer = setTimeout(() => {
          if (videoRef.current) videoRef.current.pause();
          setScene('masterplan');
        }, 5000);
        return () => clearTimeout(timer);
      }

      return () => {
        audioEngine.restoreMusic();
        if (vo1Ref.current) { vo1Ref.current.pause(); vo1Ref.current = null; }
      };
    }
  }, [scene, isMuted]);

  // 2. MASTERPLAN SCENE: Pins Shown + (2s Delay) -> Voiceover 2 ("Discover creative commercial hubs...")
  useEffect(() => {
    if (scene === 'masterplan') {
      setShowMasterplanSubtitle(false);

      const delayTimer = setTimeout(() => {
        setShowMasterplanSubtitle(true);

        if (!isMuted) {
          audioEngine.duckForVoiceover();
          const vo2 = new Audio('/assets/vo_intro_step2_clean.mp3');
          vo2.volume = 0.40;

          // When Voiceover 2 finishes 100% -> Restore music and fade out subtitle text
          vo2.onended = () => {
            audioEngine.restoreMusic();
            setTimeout(() => setShowMasterplanSubtitle(false), 800);
          };

          vo2.play().catch(() => {});
          vo2Ref.current = vo2;
        } else {
          setTimeout(() => setShowMasterplanSubtitle(false), 5000);
        }
      }, 500); // Exact 0.5-second delay after pins are revealed on screen

      return () => {
        clearTimeout(delayTimer);
        audioEngine.restoreMusic();
        if (vo2Ref.current) { vo2Ref.current.pause(); vo2Ref.current = null; }
      };
    }
  }, [scene, isMuted]);

  const handleStartExperience = () => {
    audioEngine.init();
    setScene('intro');
  };

  const handleResetPins = () => {
    if (window.confirm('Reset all pins back to initial default configuration?')) {
      setPins(DEFAULT_PINS);
      localStorage.removeItem('opet_media_city_pins');
    }
  };

  // Click Canvas Handler to Add New Pin in Editor Mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPinEditorOpen || scene !== 'masterplan') return;
    
    // Ignore clicks if clicked on sidebar or inputs
    if ((e.target as HTMLElement).closest('.pin-editor-drawer') || (e.target as HTMLElement).closest('.pin-node')) {
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const xPercent = Math.round((clickX / rect.width) * 100);
    const yPercent = Math.round((clickY / rect.height) * 100);

    const newPin: CustomPin = {
      id: `pin-${Date.now()}`,
      title: `NEW ZONE ${pins.length + 1}`,
      category: '02. MEDIA AND CREATION',
      x: xPercent,
      y: yPercent,
      description: 'Add details for this Media City destination zone.'
    };

    setPins([...pins, newPin]);
    setSelectedPinId(newPin.id);
  };

  const handleUpdatePin = (id: string, key: keyof CustomPin, value: string | number) => {
    setPins(pins.map(p => p.id === id ? { ...p, [key]: value } : p));
  };

  const handleDeletePin = (id: string) => {
    setPins(pins.filter(p => p.id !== id));
    if (selectedPinId === id) setSelectedPinId(null);
  };

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(pins, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      className={`app-container ${isPinEditorOpen ? 'pin-editor-active' : ''}`}
      onClick={handleCanvasClick}
    >
      {/* ------------------------------------------------------------- */}
      {/* OPET MESH BG CANVAS (CYAN & DARK CHARCOAL) */}
      {/* ------------------------------------------------------------- */}
      <div className="mesh-bg-canvas">
        <div className="mesh-blob mesh-blob-electric" />
        <div className="mesh-blob mesh-blob-deep" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GLOBAL HEADER BAR */}
      {/* ------------------------------------------------------------- */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo-wrap">
            <img src="/assets/opet_logo_black.png" alt="OPET Logo" className="brand-logo-img" />
          </div>
          <div className="brand-title">OPET STUDIOS</div>
        </div>

        {/* CATEGORY LAYER FILTER BAR ALIGNED IN HEADER */}
        {scene === 'masterplan' && !isPinEditorOpen && (
          <div className="category-filter-bar animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className={`filter-chip ${selectedCategory === 'ALL' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setSelectedCategory('ALL'); }}
            >
              <Grid size={13} strokeWidth={1.8} />
              <span>ALL ZONES ({pins.length})</span>
            </button>
            <button 
              className={`filter-chip ${selectedCategory === '02' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setSelectedCategory('02'); }}
            >
              <Clapperboard size={13} strokeWidth={1.8} />
              <span>MEDIA ({pins.filter(p => p.category.includes('02')).length})</span>
            </button>
            <button 
              className={`filter-chip ${selectedCategory === '03' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setSelectedCategory('03'); }}
            >
              <Landmark size={13} strokeWidth={1.8} />
              <span>TOURISM ({pins.filter(p => p.category.includes('03')).length})</span>
            </button>
            <button 
              className={`filter-chip ${selectedCategory === '04' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setSelectedCategory('04'); }}
            >
              <Home size={13} strokeWidth={1.8} />
              <span>RESIDENTIAL ({pins.filter(p => p.category.includes('04')).length})</span>
            </button>
            <button 
              className={`filter-chip ${selectedCategory === '05' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setSelectedCategory('05'); }}
            >
              <GraduationCap size={13} strokeWidth={1.8} />
              <span>INFRA ({pins.filter(p => p.category.includes('05')).length})</span>
            </button>
          </div>
        )}

        {/* PIN EDITOR TOGGLE BUTTON */}
        {scene === 'masterplan' && (
          <div className="header-editor-toggle">
            <button 
              className={`btn-pin-studio ${isPinEditorOpen ? 'active' : ''}`}
              onClick={() => setIsPinEditorOpen(!isPinEditorOpen)}
            >
              <Edit3 size={15} />
              <span>{isPinEditorOpen ? 'Close Pin Studio' : '📌 Pin Studio'}</span>
            </button>
          </div>
        )}
      </header>

      {/* ------------------------------------------------------------- */}
      {/* SCENE BACKGROUND LAYERS */}
      {/* ------------------------------------------------------------- */}
      <div className="scene-bg-layer">
        {(scene === 'start' || scene === 'intro' || scene === 'masterplan') && (
          <video 
            ref={videoRef}
            key={scene === 'start' ? 'orbit-start' : 'panning-intro'}
            autoPlay 
            loop={scene === 'start'}
            muted 
            playsInline
            className="scene-bg-video animate-fade-in"
            poster="/experience/01-INTRO/Post1.jpg"
            onEnded={() => {
              if (scene === 'intro' && videoRef.current) {
                videoRef.current.pause(); // Freeze video on final frame and await voiceover completion
              }
            }}
          >
            <source 
              src={
                scene === 'start' 
                  ? "/experience/01-INTRO/Animated/DayAnimationOrbit.mp4" 
                  : "/experience/01-INTRO/Animated/DayAnimationPanning.mp4"
              } 
              type="video/mp4" 
            />
            <img 
              src="/experience/01-INTRO/Post1.jpg" 
              alt="Media City Masterplan Start" 
              className="scene-bg-image animate-zoom"
            />
          </video>
        )}
        <div className="scene-overlay" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SCENE 0: START SCREEN */}
      {/* ------------------------------------------------------------- */}
      {scene === 'start' && (
        <div className="start-screen animate-fade-in">
          <div className="start-hero-logo-box">
            <img src="/assets/opet_logo_black.png" alt="OPET Logo" className="start-hero-logo" />
          </div>

          <div className="start-badge">
            <ShieldCheck size={14} />
            <span>INTERACTIVE SALES ECOSYSTEM • GIZA, EGYPT</span>
          </div>

          <h1 className="start-title opet-glow-text">MEDIA CITY</h1>
          <p className="start-subtitle">
            [Placeholder Tagline]
            <br />
            An interactive destination story in Giza, Egypt powered by OPET Studios.
          </p>

          <button className="btn-opet-primary" onClick={handleStartExperience}>
            <Play size={20} fill="currentColor" />
            <span>Enter Interactive Experience</span>
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SCENE 1: CINEMATIC INTRO OVERLAY */}
      {/* ------------------------------------------------------------- */}
      {scene === 'intro' && (
        <>
          <div className="intro-caption animate-fade-in">
            <div className="intro-caption-text">
              WELCOME TO MEDIA CITY — AN EXTRAORDINARY SANCTUARY OF INNOVATION.
            </div>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SCENE 2: DYNAMIC MASTERPLAN PINS & CATEGORY FILTER */}
      {/* ------------------------------------------------------------- */}
      {scene === 'masterplan' && (
        <>

          {showMasterplanSubtitle && (
            <div className="intro-caption animate-fade-in" style={{ bottom: '85px' }}>
              <div className="intro-caption-text">
                THE CITY WHERE YOU CAN DISCOVER CREATIVE COMMERCIAL HUBS, VIRTUAL STUDIO BACKLOTS, AND PROMENADE ZONES.
              </div>
            </div>
          )}

          {pins
            .filter(pin => selectedCategory === 'ALL' || pin.category.includes(selectedCategory))
            .map((pin) => (
              <div 
                key={pin.id}
                className={`hotspot-node pin-node ${selectedPinId === pin.id ? 'pin-selected' : ''}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onMouseEnter={() => setHoveredHotspot(pin.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isPinEditorOpen) {
                    setSelectedPinId(pin.id);
                  } else {
                    handleOpenPinModal(pin);
                  }
                }}
              >
                <div className="hotspot-pulse-cyan animate-pulse-opet" />
                <button className="hotspot-button-cyan">
                  {getCategoryIcon(pin.category, 15)}
                </button>

                {(hoveredHotspot === pin.id || selectedPinId === pin.id) && (
                  <div className="hotspot-card-mesh animate-fade-in">
                    <div className="hotspot-card-title">{pin.title}</div>
                    <div className="hotspot-card-subtitle">{pin.category}</div>
                  </div>
                )}
              </div>
            ))}

          {!isPinEditorOpen && (
            <div className="bottom-nav animate-fade-in">
              <div className="nav-hint">
                <Sparkles size={16} style={{ color: 'var(--opet-cyan-accent)' }} />
                <span>Select any pin to view destination details • Click "📌 Pin Studio" on top to edit pins</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE PIN EDITOR SIDEBAR / DRAWER */}
      {/* ------------------------------------------------------------- */}
      {isPinEditorOpen && scene === 'masterplan' && (
        <div className="pin-editor-drawer animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <div className="drawer-title">
              <Sliders size={18} style={{ color: 'var(--opet-cyan-accent)' }} />
              <span>PINNING STUDIO</span>
            </div>
            <button className="drawer-close" onClick={() => setIsPinEditorOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="drawer-hint">
            💡 Click anywhere on the masterplan background to drop a new pin at that exact point!
          </div>

          <div className="drawer-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-drawer-action" onClick={handleCopyJson} style={{ flex: 1 }}>
              {copiedJson ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedJson ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>
            <button className="btn-drawer-action" onClick={handleResetPins} style={{ background: 'rgba(255, 60, 60, 0.15)', borderColor: 'rgba(255, 60, 60, 0.3)', color: '#ff6b6b' }}>
              <span>Reset</span>
            </button>
          </div>

          <div className="pins-list-scroll">
            {pins.map((pin, idx) => (
              <div 
                key={pin.id} 
                className={`pin-item-card ${selectedPinId === pin.id ? 'active' : ''}`}
                onClick={() => setSelectedPinId(pin.id)}
              >
                <div className="pin-item-header">
                  <span className="pin-number">#{idx + 1}</span>
                  <input 
                    type="text"
                    className="pin-input-title"
                    value={pin.title}
                    onChange={(e) => handleUpdatePin(pin.id, 'title', e.target.value)}
                    placeholder="Pin Name"
                  />
                  <button 
                    className="btn-delete-pin" 
                    title="Delete Pin"
                    onClick={(e) => { e.stopPropagation(); handleDeletePin(pin.id); }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="pin-input-row">
                  <label className="pin-label">Category / Zone:</label>
                  <input 
                    type="text"
                    className="pin-input-field"
                    value={pin.category}
                    onChange={(e) => handleUpdatePin(pin.id, 'category', e.target.value)}
                  />
                </div>

                <div className="pin-input-row-coords">
                  <div className="coord-box">
                    <label>Left (X%):</label>
                    <input 
                      type="number"
                      value={pin.x}
                      onChange={(e) => handleUpdatePin(pin.id, 'x', Number(e.target.value))}
                    />
                  </div>
                  <div className="coord-box">
                    <label>Top (Y%):</label>
                    <input 
                      type="number"
                      value={pin.y}
                      onChange={(e) => handleUpdatePin(pin.id, 'y', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="pin-input-row">
                  <label className="pin-label">Image / Media Path:</label>
                  <input 
                    type="text"
                    className="pin-input-field"
                    value={pin.imagePath || ''}
                    placeholder="/experience/02-MEDIA-AND-CREATION/"
                    onChange={(e) => handleUpdatePin(pin.id, 'imagePath', e.target.value)}
                  />
                </div>

                <div className="pin-input-row">
                  <label className="pin-label">Description:</label>
                  <textarea 
                    className="pin-input-textarea"
                    rows={2}
                    value={pin.description || ''}
                    placeholder="Enter details for this pin..."
                    onChange={(e) => handleUpdatePin(pin.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* POPUP MODAL: FULLSCREEN VIDEO HERO EXPERIENCE (OPTION 3) */}
      {/* ------------------------------------------------------------- */}
      {activeModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setActiveModal(null)}>
          <div className="option3-hero-overlay animate-fade-in" onClick={(e) => e.stopPropagation()}>
            
            {/* LEFT DARK GRADIENT OVERLAY (RED ZONE) FOR DRAMATIC READABILITY */}
            <div className="option3-left-gradient-overlay" />

            {/* BLACK FADEOUT OVERLAY TRANSITION (0.5s) */}
            <div className={`video-fade-overlay ${isVideoFading ? 'fading' : ''}`} />

            {/* INSTANT VISUAL UNDERLAY POSTER IMAGE (0ms DELAY VISUAL) */}
            {activeModal.imagePath && (
              <img 
                src={encodeURI(activeModal.imagePath)} 
                alt={activeModal.title} 
                className="option3-hero-video"
                style={{ zIndex: 0 }}
              />
            )}

            {/* FULLSCREEN VIDEO HERO PLAYER WITH PLAYLIST */}
            {activeModal.videoPlaylist && activeModal.videoPlaylist.length > 0 ? (
              <video 
                key={currentVideoIdx}
                src={encodeURI(activeModal.videoPlaylist[currentVideoIdx])} 
                autoPlay 
                preload="auto"
                muted={isMuted} 
                playsInline 
                onTimeUpdate={(e) => handleVideoTimeUpdate(e, activeModal.videoPlaylist!.length)}
                onEnded={() => handleNextVideo(activeModal.videoPlaylist!.length)}
                className="option3-hero-video"
                style={{ zIndex: 1 }}
              />
            ) : activeModal.videoPath ? (
              <video 
                src={encodeURI(activeModal.videoPath)} 
                autoPlay 
                preload="auto"
                loop 
                muted={isMuted} 
                playsInline 
                className="option3-hero-video"
                style={{ zIndex: 1 }}
              />
            ) : activeModal.imagePath ? (
              <img src={encodeURI(activeModal.imagePath)} alt={activeModal.title} className="option3-hero-video" style={{ zIndex: 1 }} />
            ) : null}

            {/* TOP HUD HEADER */}
            <div className="option3-top-hud">
              <div>
                <span className="modal-tag">{activeModal.category}</span>
                <h2 className="modal-title" style={{ fontSize: '2.2rem', textShadow: '0 4px 16px rgba(0,0,0,0.9)', margin: '4px 0 0' }}>
                  {activeModal.title}
                </h2>

                {/* SUB-TITLE & PARAGRAPH DESCRIPTION (MATCHING USER SKETCH) */}
                {(() => {
                  const activeDetail = activeModal.videoDetails?.[currentVideoIdx];
                  const activeSubTitle = activeDetail?.title || 
                    activeModal.videoDescriptions?.[currentVideoIdx]?.split(' — ')?.[0] || 
                    "SCENE FOCUS";
                  const activeSubDesc = activeDetail?.description || 
                    activeModal.videoDescriptions?.[currentVideoIdx]?.split(' — ')?.[1] || 
                    activeModal.description || "";

                  return (
                    <div style={{ marginTop: '33px', maxWidth: '403px', animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: 'var(--opet-cyan-accent)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        margin: '0 0 10px 0',
                        textShadow: '0 0 16px var(--opet-cyan-glow)'
                      }}>
                        {activeSubTitle}
                      </h3>
                      <p style={{
                        color: '#dbe4ee',
                        fontSize: '0.92rem',
                        lineHeight: '1.65',
                        margin: 0,
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        textShadow: '0 2px 10px rgba(0,0,0,0.95)'
                      }}>
                        {activeSubDesc}
                      </p>
                    </div>
                  );
                })()}
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                {/* VIDEO PLAYLIST HUD COUNTER & SKIP CONTROLS */}
                {activeModal.videoPlaylist && activeModal.videoPlaylist.length > 1 && (
                  <div className="playlist-hud-badge">
                    <button 
                      className="playlist-nav-btn" 
                      onClick={() => handlePrevVideo(activeModal.videoPlaylist!.length)}
                      title="Previous Video Render"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="playlist-counter-text">
                      🎬 RENDER {currentVideoIdx + 1} / {activeModal.videoPlaylist.length}
                    </span>
                    <button 
                      className="playlist-nav-btn" 
                      onClick={() => handleNextVideo(activeModal.videoPlaylist!.length)}
                      title="Next Video Render"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}

                <button 
                  className="modal-close-btn" 
                  onClick={() => setActiveModal(null)} 
                  style={{ position: 'relative', top: 0, right: 0, background: 'rgba(0,0,0,0.6)', border: '1px solid var(--opet-cyan-accent)' }}
                >
                  <X size={22} />
                </button>
              </div>
            </div>



            {/* BOTTOM HUD FILMSTRIP & OVERVIEW */}
            <div className="option3-bottom-filmstrip">
              <div style={{ maxWidth: '520px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                  <Sparkles size={16} style={{ color: 'var(--opet-cyan-accent)' }} />
                  <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                    DESTINATION OVERVIEW
                  </span>
                </div>
                <p style={{ color: 'var(--opet-grey-light)', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                  {activeModal.description}
                </p>
              </div>

              {/* STILL PHOTO RENDERS FILMSTRIP */}
              {activeModal.galleryImages && activeModal.galleryImages.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--opet-cyan-accent)', fontWeight: 800 }}>
                    📸 STILL RENDERS GALLERY ({activeModal.galleryImages.length})
                  </span>
                  <div className="photo-filmstrip">
                    {activeModal.galleryImages.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        className={`filmstrip-thumb ${lightboxImg === imgUrl ? 'active' : ''}`}
                        onClick={() => setLightboxImg(imgUrl)}
                        title="Click to view high-res photo render"
                      >
                        <img src={encodeURI(imgUrl)} alt={`Still ${i}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* HIGH-RES PHOTO LIGHTBOX OVERLAY */}
            {lightboxImg && (
              <div 
                className="modal-overlay animate-fade-in" 
                style={{ zIndex: 120, background: 'rgba(0,0,0,0.92)' }}
                onClick={() => setLightboxImg(null)}
              >
                <div style={{ position: 'relative', maxWidth: '85vw', maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="modal-close-btn" 
                    onClick={() => setLightboxImg(null)}
                    style={{ top: '-15px', right: '-15px', zIndex: 130 }}
                  >
                    <X size={20} />
                  </button>
                  <img 
                    src={encodeURI(lightboxImg)} 
                    alt="High-Res Still Render" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px', border: '1px solid var(--opet-cyan-accent)', boxShadow: '0 0 40px var(--opet-cyan-glow)' }} 
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* FLOATING SOUND CONTROL (BOTTOM RIGHT CORNER) */}
      {/* ------------------------------------------------------------- */}
      <button 
        className="sound-btn-fixed"
        onClick={toggleMute}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}
