"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import ProfileCard from "@/components/ProfileCard";

const ProfilePage = () => {
  const params = useParams();
  const profileID = params?.profileID;

  // Vérifiez que `profileID` est valide
  const clerkId = Array.isArray(profileID) ? profileID[0] : profileID;

  // Appels des Hooks en dehors des conditions
  const user = useQuery(api.users.getUserById, { clerkId: clerkId || "" });
  const podcastsData = useQuery(api.podcast.getPodcastByAuthorId, {
    profileID: clerkId || "",
  });

  // Gestion du chargement
  if (!clerkId || !user || !podcastsData) {
    return <LoaderSpinner />;
  }

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        {/* Placeholder pour une carte de profil */}
        <ProfileCard
          podcastData={podcastsData}
          imageUrl={user?.imageUrl}
          userFirstName={user?.name}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData?.podcasts?.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData.podcasts.slice(0, 4).map((podcast) => (
              <PodcastCard
                key={podcast._id}
                imgUrl={podcast.imageUrl}
                title={podcast.podcastTitle}
                description={podcast.podcastDescription}
                podcastId={podcast._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
