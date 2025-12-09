def calculate_xp(minutes):
    CONSTANT_BASE = 10 
    EXPONENT_FACTOR = 1.2

    if minutes <= 0:
        return 0
    
    raw_xp = CONSTANT_BASE * (minutes ** EXPONENT_FACTOR)

    final_xp = round(raw_xp)
    return final_xp