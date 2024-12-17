import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { useAuth, useUser } from "@clerk/clerk-react";
import { router } from "expo-router";
import { Doc } from "@packages/backend/convex/_generated/dataModel";
import { useNotes } from "../hooks/useNotes";

const NotesDashboardScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const imageUrl = user?.imageUrl;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const [search, setSearch] = useState("");
  const { notes: allNotes, loading } = useNotes();

  const finalNotes = useMemo(() => {
    if (!allNotes) {
      return [];
    }

    return search
      ? allNotes?.filter(
          (note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase()),
        )
      : allNotes;
  }, [allNotes, search]);

  const renderItem = ({ item }: { item: Doc<"notes"> }) => (
    <TouchableOpacity
      onPress={() => {
        router.navigate(`/(home)/notes/${item._id}`);
      }}
      activeOpacity={0.5}
      style={styles.noteItem}
    >
      <Text style={styles.noteText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo2small.png")} // Replace with your logo image file
          style={styles.logo}
        />
      </View>

      <View style={styles.yourNotesContainer}>
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {imageUrl && (
            <Image style={styles.avatarSmall} source={{ uri: imageUrl }} />
          )}
          <Text>
            {firstName} {lastName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => await signOut()}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "pink",
            padding: 10,
            borderRadius: 10,
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "red" }}>Logout</Text>
          <AntDesign name="logout" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="grey"
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={(e) => setSearch(e)}
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>
      {!allNotes && (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {allNotes && allNotes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Create your first note to{"\n"}get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={finalNotes}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.notesList}
          contentContainerStyle={{
            marginTop: 19,
            borderTopWidth: 0.5,
            borderTopColor: "rgba(0, 0, 0, 0.59)",
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => router.navigate("/(home)/notes/create")}
        style={styles.newNoteButton}
      >
        <AntDesign name="pluscircle" size={20} color="#fff" />
        <Text style={styles.newNoteButtonText}>Create a New Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0D87E1",
    height: 67,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: RFValue(17.5),
    fontFamily: "MMedium",
    alignSelf: "center",
  },
  yourNotesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    marginTop: 19,
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: RFValue(15),
    fontFamily: "MRegular",
    color: "#2D2D2D",
  },
  notesList: {
    display: "flex",
    width: "100%",
    height: "auto",
  },
  noteItem: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.59)",
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  noteText: {
    fontSize: 16,
    fontFamily: "MLight",
    color: "#2D2D2D",
  },

  newNoteButton: {
    flexDirection: "row",
    backgroundColor: "#0D87E1",
    borderRadius: 7,
    width: Dimensions.get("window").width / 1.6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    position: "absolute",
    bottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  newNoteButtonText: {
    color: "white",
    fontSize: RFValue(15),
    fontFamily: "MMedium",
    marginLeft: 10,
  },
  switchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  emptyStateText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: RFValue(15),
    color: "grey",
    fontFamily: "MLight",
  },
  emptyState: {
    width: "100%",
    height: "35%",
    marginTop: 19,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.59)",
  },
});

export default NotesDashboardScreen;
