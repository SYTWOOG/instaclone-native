import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { gql } from "@apollo/client/core";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { useQuery } from "@apollo/client/react/hooks";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed() {
    const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
      variables: {
        offset: 0,
      },
    });
    const renderPhoto = ({ item: photo }) => {
      return (
        <Photo {...photo} />
      );
    };
    const refresh = async() => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
    const [refreshing, setRefreshing] = useState(false);
    return (
     <ScreenLayout loading={loading}>
      <FlatList 
        onEndReachedThreshold={0.02}
        onEndReached={() => 
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed} 
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
     </ScreenLayout>
    );
}