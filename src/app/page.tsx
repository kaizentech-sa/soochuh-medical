import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Phases from "@/components/Phases";
import Difference from "@/components/Difference";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import ScrollAnimator from "@/components/ScrollAnimator";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

type HeroSlide = {
  image: any;
  alt?: string;
  caption?: string;
};

type HeroData = {
  slideshowImages?: HeroSlide[];
} | null;

type SpecialisationCard = {
  image: any;
  title: string;
  subtitle?: string;
};

type SpecialisationsData = {
  cards?: SpecialisationCard[];
} | null;

type WhatWeDoItemData = {
  image: any;
  title: string;
  caption?: string;
};

type WhatWeDoData = {
  items?: WhatWeDoItemData[];
} | null;

type DifferenceSectionData = {
  whatMakesUsDifferent?: {
    description?: string;
    buttonLink?: string;
  };
  nextVisit?: {
    description?: string;
    buttonLink?: string;
  };
} | null;

type PatientStory = {
  text: string;
  author: string;
};

type PatientStoriesData = {
  sourceMode?: "manual" | "google";
  manualStories?: PatientStory[];
  googleApiKey?: string;
  googlePlaceId?: string;
} | null;

type GalleryImageData = {
  image: any;
  alt?: string;
};

type GallerySectionData = {
  images?: GalleryImageData[];
} | null;

type TeamMemberData = {
  name: string;
  role: string;
  image: any;
  story: string;
  appointmentLink: string;
  websiteLink: string;
};

type TeamSectionData = {
  members?: TeamMemberData[];
} | null;

type CollaboratorLogoData = {
  name: string;
  logo: any;
};

type CollaboratorsSectionData = {
  logos?: CollaboratorLogoData[];
} | null;

type ContactPhoneData = {
  label?: string;
  number: string;
  isMain?: boolean;
};

type ContactSectionData = {
  phoneNumbers?: ContactPhoneData[];
  whatsappNumber?: string;
  address?: string;
  email?: string;
} | null;

type AppointmentSettingsData = {
  appointmentLink?: string;
} | null;

async function getHeroData() {
  return client.fetch<HeroData>(`*[_type == "hero" && _id == "hero"][0]{
    slideshowImages[]{
      alt,
      caption,
      "image": asset
    }
  }`);
}

async function getSpecialisationsData() {
  return client.fetch<SpecialisationsData>(
    `*[_type == "specialisations" && _id == "specialisations"][0]{
      cards[]{
        title,
        subtitle,
        "image": image.asset
      }
    }`,
  );
}

async function getWhatWeDoData() {
  return client.fetch<WhatWeDoData>(
    `*[_type == "whatWeDo" && _id == "whatWeDo"][0]{
      items[]{
        title,
        caption,
        "image": image.asset
      }
    }`,
  );
}

async function getDifferenceSectionData() {
  return client.fetch<DifferenceSectionData>(
    `*[_type == "differenceSection" && _id == "differenceSection"][0]{
      whatMakesUsDifferent{
        description,
        buttonLink
      },
      nextVisit{
        description,
        buttonLink
      }
    }`,
  );
}

async function getPatientStoriesData() {
  return client.fetch<PatientStoriesData>(
    `*[_type == "patientStories" && _id == "patientStories"][0]{
      sourceMode,
      googleApiKey,
      googlePlaceId,
      "manualStories": manualStories[]{
        text,
        author
      }
    }`,
  );
}

async function getGallerySectionData() {
  return client.fetch<GallerySectionData>(
    `*[_type == "gallerySection" && _id == "gallerySection"][0]{
      images[]{
        alt,
        "image": asset
      }
    }`,
  );
}

async function getTeamSectionData() {
  return client.fetch<TeamSectionData>(
    `*[_type == "teamSection" && _id == "teamSection"][0]{
      members[]{
        name,
        role,
        story,
        appointmentLink,
        websiteLink,
        "image": image.asset
      }
    }`,
  );
}

async function getCollaboratorsSectionData() {
  return client.fetch<CollaboratorsSectionData>(
    `*[_type == "collaboratorsSection" && _id == "collaboratorsSection"][0]{
      logos[]{
        name,
        "logo": logo.asset
      }
    }`,
  );
}

async function getContactSectionData() {
  return client.fetch<ContactSectionData>(
    `*[_type == "contactSection" && _id == "contactSection"][0]{
      phoneNumbers[]{
        label,
        number,
        isMain
      },
      whatsappNumber,
      address,
      email
    }`,
  );
}

async function getAppointmentSettingsData() {
  return client.fetch<AppointmentSettingsData>(
    `*[_type == "appointmentSettings" && _id == "appointmentSettings"][0]{
      appointmentLink
    }`,
  );
}

async function getGoogleStories(apiKey: string, placeId: string): Promise<PatientStory[]> {
  const endpoint = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  endpoint.searchParams.set("place_id", placeId);
  endpoint.searchParams.set("fields", "reviews");
  endpoint.searchParams.set("key", apiKey);

  const response = await fetch(endpoint.toString(), { cache: "no-store" });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const reviews = Array.isArray(data?.result?.reviews) ? data.result.reviews : [];

  return reviews
    .filter((review: any) => review?.text && review?.author_name)
    .map((review: any) => ({
      text: String(review.text),
      author: String(review.author_name),
    }));
}

export default async function Home() {
  const [
    heroData,
    whatWeDoData,
    specialisationsData,
    differenceSectionData,
    patientStoriesData,
    gallerySectionData,
    teamSectionData,
    collaboratorsSectionData,
    contactSectionData,
    appointmentSettingsData,
  ] = await Promise.all([
    getHeroData(),
    getWhatWeDoData(),
    getSpecialisationsData(),
    getDifferenceSectionData(),
    getPatientStoriesData(),
    getGallerySectionData(),
    getTeamSectionData(),
    getCollaboratorsSectionData(),
    getContactSectionData(),
    getAppointmentSettingsData(),
  ]);

  const heroSlides =
    heroData?.slideshowImages?.map((slide) => ({
      src: urlFor(slide.image).width(2200).height(1400).fit("crop").url(),
      alt: slide.alt || "Hero slideshow image",
      caption: slide.caption,
    })) ?? [];

  const specialisationCards =
    specialisationsData?.cards?.map((card) => ({
      image: urlFor(card.image).width(1000).height(700).fit("crop").url(),
      title: card.title,
      subtitle: card.subtitle,
    })) ?? [];
  const healthcareFieldTitles = specialisationsData?.cards?.map((card) => card.title) ?? [];
  const whatWeDoItems =
    whatWeDoData?.items?.map((item) => ({
      icon: urlFor(item.image).width(120).height(120).fit("crop").url(),
      title: item.title,
      description: item.caption,
      href: "#",
    })) ?? [];

  const manualStories = patientStoriesData?.manualStories ?? [];

  let patientStories = manualStories;
  if (
    patientStoriesData?.sourceMode === "google" &&
    patientStoriesData.googleApiKey &&
    patientStoriesData.googlePlaceId
  ) {
    try {
      const googleStories = await getGoogleStories(
        patientStoriesData.googleApiKey,
        patientStoriesData.googlePlaceId,
      );
      if (googleStories.length > 0) {
        patientStories = googleStories;
      }
    } catch {
      patientStories = manualStories;
    }
  }

  const galleryImages =
    gallerySectionData?.images?.map((item, index) => ({
      src: urlFor(item.image).width(1200).height(900).fit("crop").url(),
      alt: item.alt || `Gallery image ${index + 1}`,
    })) ?? [];

  const teamMembers =
    teamSectionData?.members?.map((member) => ({
      name: member.name,
      role: member.role,
      story: member.story,
      appointmentLink: member.appointmentLink,
      websiteLink: member.websiteLink,
      image: urlFor(member.image).width(500).height(500).fit("crop").url(),
    })) ?? [];

  const collaboratorLogos =
    collaboratorsSectionData?.logos?.map((logoItem) => ({
      name: logoItem.name,
      logo: urlFor(logoItem.logo).width(400).height(200).fit("crop").url(),
    })) ?? [];

  const contactPhones = contactSectionData?.phoneNumbers ?? [];
  const selectedMainPhone = contactPhones.find((phone) => phone.isMain)?.number;
  const mainPhoneNumber = selectedMainPhone || contactPhones[0]?.number;
  const whatsappNumber = contactSectionData?.whatsappNumber;
  const appointmentLink = appointmentSettingsData?.appointmentLink;

  return (
    <main className="min-h-screen">
      <ScrollAnimator />
      <Header
        mainPhoneNumber={mainPhoneNumber}
        whatsappNumber={whatsappNumber}
        appointmentLink={appointmentLink}
        healthcareFields={healthcareFieldTitles}
      />
      <div className="pt-20">
        <Hero
          slides={heroSlides}
          mainPhoneNumber={mainPhoneNumber}
          whatsappNumber={whatsappNumber}
        />
        <Services items={whatWeDoItems} />
        <About />
        <Phases cards={specialisationCards} />
        <Difference
          whatMakesUsDifferentDescription={
            differenceSectionData?.whatMakesUsDifferent?.description
          }
          whatMakesUsDifferentButtonLink={
            differenceSectionData?.whatMakesUsDifferent?.buttonLink
          }
          nextVisitDescription={differenceSectionData?.nextVisit?.description}
          nextVisitButtonLink={differenceSectionData?.nextVisit?.buttonLink}
        />
        <Testimonials stories={patientStories} />
        <Gallery images={galleryImages} />
        <Team members={teamMembers} />
        <Partners collaborators={collaboratorLogos} />
        <Contact
          phoneNumbers={contactSectionData?.phoneNumbers}
          whatsappNumber={whatsappNumber}
          address={contactSectionData?.address}
          email={contactSectionData?.email}
        />
        <Footer />
      </div>
      <ContactBar
        mainPhoneNumber={mainPhoneNumber}
        whatsappNumber={whatsappNumber}
      />
    </main>
  );
}
