def process_xp_gain(current_level, current_xp_in_bar, xp_earned):
    total_xp = current_xp_in_bar + xp_earned
    required_xp = current_level * 100

    while total_xp >= required_xp:
        total_xp -= required_xp
        current_level += 1
        required_xp = current_level * 100

    return current_level, total_xp, required_xp