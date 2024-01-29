import cardData from './card.js';

$(document).ready(function() {
    function generateProfileContainer(profile) {
        return $('<div>', {class: 'profile-container'})
            .append($('<div>', {class: 'profile'}).append($('<img>', {src: profile.imgSrc, alt: profile.altText})))
            .append($('<div>', {class: 'profile-name'}).text(profile.name))
            .append($('<br>'))
            .append($('<div>', {class: 'hp'}).text('HP: ' + profile.hp));
    }
    function generateStatRow(statRow) {
        const $row = $('<div>', {class: 'stat-row'});
        for (let key in statRow) {
            $row.append($('<div>', {class: 'stat'}).text(`${key} ${statRow[key]}`));
        }
        return $row;
    }
    function generateInventoryItem(item) {
        const $itemImg = $('<div>', {class: 'item-img'}).append($('<img>', {src: item.imgSrc, alt: item.altText}));
        const $itemName = $('<span>').text(item.name);
        const itemStyle = 'background-color: #33cc33; text-decoration: none; color: inherit;';
        const $item = $('<div>', {class: 'item', style: item.url ? itemStyle : ''}).append($itemImg).append($itemName);
        if (item.url) {
            return $('<a>', {href: item.url, style: 'text-decoration: none; color: inherit;'}).append($item);
        }
        return $item;
    }
    function generateInventory(inventory) {
        const $inventory = $('<div>', {class: 'inventory'});
        inventory.forEach(item => $inventory.append(generateInventoryItem(item)));
        return $inventory;
    }
    function generateMiscItem(miscItem) {
        return $('<div>', {class: 'misc-item'}).text(miscItem);
    }
    function generateMisc(misc) {
        const $misc = $('<div>', {class: 'misc'});
        misc.forEach(item => $misc.append(generateMiscItem(item)));
        return $misc;
    }
    const $card = $('<div>', {class: 'card'})
        .append(generateProfileContainer(cardData.profile))
        .append($('<div>', {class: 'stats'}).append(cardData.stats.map(generateStatRow)))
        .append(generateInventory(cardData.inventory))
        .append(generateMisc(cardData.misc));
    $('.container').append($card);
});
