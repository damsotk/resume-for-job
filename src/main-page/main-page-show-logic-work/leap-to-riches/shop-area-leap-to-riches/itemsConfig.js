export const itemsConfig = [
    {
        id: 'click_power_item_level_2',
        name: 'Click Power Item - Level 2',
        description: 'Increases click power to level 2.',
        cost: 200,
        applyEffect: (player) => {
            player.store_bought_items.click_power_item = 'level 2';
        },
    },
];