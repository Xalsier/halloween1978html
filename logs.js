const logs = {
    "1": {
        "Log #1": [
            ["Heather", "Ahem.", 0],
            ["Heather", "Hiiiii!", 500],
            ["Heather", "I'm right now, holding a Motorola..", 500],
            ["Heather", "Jesus christ I think I just stepped into a puddle.", 1000],
            ["Heather", "If this is working, then my RV should be recording this.", 1000],
            ["Heather", "I probably fucked something up I'm going back to check.", 1500]
        ]
    },
    "2": {
        "Log #2": [
            ["Heather", "Mayday mayday. There's a situation- or something. Calling sign...Heather.", 500],
            ["Unknown Officer", "Hello? What's the emergency?", 500],
            ["Heather", "There's a", 1000],
            ["Heather", "By a campsite...", 1000],
            ["Heather", "It was to the right I think from that large tree with the hole in the center and a birds nest-", 1500],
            ["Heather", "Close to the entrance of the woods-, a few meters out.", 1500],
            ["Heather", "Someones tracks lead back to the highschool,", 500],
            ["Heather", "I have some photos of them I could probably deliver...2 people were with me.", 500],
            ["Heather", "Safety concern, you know. Over.", 1000],
            ["Unknown Officer", "Woah... in the woods? How long ago did you find this?", 1000],
            ["Heather", "It takes me...a few minutes to walk...", 1500],
            ["Heather", "So I assume at least an hour to half-and hour ago.", 1500],
            ["Heather", "The firepit was fresh, area was still warm. ", 500],
            ["Heather", "We just missed whoever it was, and there was a", 500],
            ["Heather", "I didn't even think of that fuck.", 1000],
            ["Heather", "Sorry, we were worried that he was close enough to attack us back then.", 1000],
            ["Unknown Officer", "Roger that... is that all you found? You aren't pranking me, right?", 1500],
            ["Heather", "No- officer. I'm not pranking you. ", 1500],
            ["Heather", "I should be able to develop the photos in an hour if you want to verify at the station, ", 500],
            ["Heather", "But it'd be better if you sent someone to investigate.", 500],
            ["Unknown Officer", "Alright… Thanks for your report.", 1000]
        ]
    }
};
export default logs;

export function handleSuggestion(suggestion, events, addMessageWithDynamicDelay) {
    if (events && events[suggestion]) {
        for (const eventMessage of events[suggestion]) {
            addMessageWithDynamicDelay(eventMessage[0], eventMessage[1]);
        }
    }
}

export function displaySuggestions(suggestions, suggestionContainer, handleSuggestionClick) {
    suggestionContainer.empty();
    for (const suggestion of suggestions) {
        const suggestionButton = $("<button></button>");
        suggestionButton.addClass("suggestion-button");
        suggestionButton.text(suggestion);
        suggestionButton.click(() => handleSuggestionClick(suggestion));
        suggestionContainer.append(suggestionButton);
    }
}