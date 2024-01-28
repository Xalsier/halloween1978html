// profiles.js
export const profiles = {
    1: { image: 'heather.png', name: 'Heather' },
    2: { image: '', name: 'Police Department' }
};

export function generateProfileElements(main1) {
    main1.empty();
    $.each(profiles, function(id, profile) {
        if (profile.image) {
            main1.append(`<img src="${profile.image}" alt="${profile.name}" class="profile-image" data-profileid="${id}">`);
        } else {
            const initials = profile.name.match(/\b(\w)/g).join('');
            main1.append(`<div class="placeholderDiv" data-profileid="${id}">${initials}</div>`);
        }
    });
}

export function updateTopProfile(profile, topProfileImage, topPlaceholderDiv, topTitle) {
    if (profile.image) {
        topProfileImage.attr('src', profile.image).show();
        topPlaceholderDiv.hide();
    } else {
        const initials = profile.name.match(/\b(\w)/g).join('');
        topPlaceholderDiv.text(initials).show();
        topProfileImage.hide();
    }
    topTitle.text(profile.name);
}
