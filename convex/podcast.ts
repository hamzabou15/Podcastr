"use client"
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


// create podcast
export const createPodcast = mutation({
    // on a deux parametres
    args: {
        audioStorageId: v.id("_storage"),
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioUrl: v.string(),
        imageUrl: v.string(),
        imageStorageId: v.id("_storage"),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        views: v.number(),
        audioDuration: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("User not authenticated");
        }

        // Fetch the user using the authenticated user's email
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), identity.email))
            .collect();

        if (user.length === 0) {
            throw new ConvexError("User not found");
        }

        const podcast = await ctx.db.insert('podcasts', {
            ...args,
            user: user[0]._id,
            author: user[0].name,
            authorId: user[0].clerkId,
            authorImageUrl: user[0].imageUrl
        });

        return podcast;
    }

})

// get all podcasts
export const getTrendingPodcasts = query({
    handler: async (ctx) => {
        const podcasts = await ctx.db.query("podcasts").collect();
        console.log(podcasts)
        return podcasts
    },
})


// get one podcast
export const getPodcastById = query({
    args: {
        podcastId: v.id('podcasts')
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.podcastId)
    },
})


// get url generator
export const getUrl = mutation({
    args: {
        storageId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    },
})


// this query will get all the podcasts based on the voiceType of the podcast , which we are showing in the Similar Podcasts section.
export const getPodcastByVoiceType = query({
    args: {
      podcastId: v.id("podcasts"),
    },
    handler: async (ctx, args) => {
        // we get the podcast by the id 
      const podcast = await ctx.db.get(args.podcastId);
        // 
      return await ctx.db
        .query("podcasts")
        .filter((q) =>
          q.and(
            q.eq(q.field("voiceType"), podcast?.voiceType),
            q.neq(q.field("_id"), args.podcastId)
          )
        )
        .collect();
    },
  });

  // this mutation will delete the podcast.
export const deletePodcast = mutation({
    args: {
      podcastId: v.id("podcasts"),
      imageStorageId: v.id("_storage"),
      audioStorageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
      const podcast = await ctx.db.get(args.podcastId);
  
      if (!podcast) {
        throw new ConvexError("Podcast not found");
      }
  
      await ctx.storage.delete(args.imageStorageId);
      await ctx.storage.delete(args.audioStorageId);
      return await ctx.db.delete(args.podcastId);
    },
  });
  