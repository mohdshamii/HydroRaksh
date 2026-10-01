# Generator for JalRakshak AI — 75 UP Districts Water Resource & Planning Horizons Dataset
# Replaces historical kings/polities with longitudinal hydrological time-series (2000 to 2035)

import json
import math

UP_DISTRICTS_RAW = [
    # Saharanpur & Meerut (Upper Doab)
    {"id": "saharanpur", "name": "Saharanpur", "division": "Saharanpur", "region": "Upper Doab", "lat": 29.96, "lng": 77.55, "area": 3689, "basin": "Yamuna & Hindon", "gw": 14.2, "trend": -22, "cat": "Semi-Critical", "rain": 980, "soil": "Alluvial Sandy Loam", "slope": 1.4, "stage": 86.4, "demand": 412},
    {"id": "shamli", "name": "Shamli", "division": "Saharanpur", "region": "Upper Doab", "lat": 29.45, "lng": 77.31, "area": 1167, "basin": "Yamuna Basin", "gw": 24.8, "trend": -38, "cat": "Over-Exploited", "rain": 760, "soil": "Deep Sandy Alluvium", "slope": 1.1, "stage": 138.2, "demand": 380},
    {"id": "muzaffarnagar", "name": "Muzaffarnagar", "division": "Saharanpur", "region": "Upper Doab", "lat": 29.47, "lng": 77.70, "area": 2945, "basin": "Ganga & Kali", "gw": 22.1, "trend": -35, "cat": "Over-Exploited", "rain": 820, "soil": "Alluvial Silt Loam", "slope": 1.0, "stage": 124.5, "demand": 590},
    {"id": "baghpat", "name": "Baghpat", "division": "Meerut", "region": "Upper Doab", "lat": 28.94, "lng": 77.22, "area": 1321, "basin": "Yamuna Basin", "gw": 26.5, "trend": -42, "cat": "Over-Exploited", "rain": 690, "soil": "Sandy Loam Alluvium", "slope": 0.9, "stage": 145.8, "demand": 340},
    {"id": "meerut", "name": "Meerut", "division": "Meerut", "region": "Upper Doab", "lat": 28.98, "lng": 77.70, "area": 2559, "basin": "Hindon & Kali", "gw": 21.4, "trend": -31, "cat": "Critical", "rain": 840, "soil": "Fine Alluvial Silt", "slope": 1.2, "stage": 98.4, "demand": 620},
    {"id": "ghaziabad", "name": "Ghaziabad", "division": "Meerut", "region": "Upper Doab", "lat": 28.67, "lng": 77.45, "area": 777, "basin": "Hindon Basin", "gw": 29.2, "trend": -48, "cat": "Over-Exploited", "rain": 710, "soil": "Deep Sandy Alluvium", "slope": 0.8, "stage": 154.2, "demand": 480},
    {"id": "hapur", "name": "Hapur", "division": "Meerut", "region": "Upper Doab", "lat": 28.73, "lng": 77.78, "area": 1124, "basin": "Ganga Basin", "gw": 19.8, "trend": -28, "cat": "Critical", "rain": 790, "soil": "Alluvial Loam", "slope": 1.1, "stage": 94.6, "demand": 310},
    {"id": "gautam-buddha-nagar", "name": "Gautam Buddha Nagar", "division": "Meerut", "region": "Upper Doab", "lat": 28.35, "lng": 77.55, "area": 1442, "basin": "Yamuna Basin", "gw": 28.6, "trend": -45, "cat": "Over-Exploited", "rain": 680, "soil": "Sandy Alluvium", "slope": 0.7, "stage": 142.1, "demand": 510},
    {"id": "bulandshahr", "name": "Bulandshahr", "division": "Meerut", "region": "Upper Doab", "lat": 28.40, "lng": 77.85, "area": 4512, "basin": "Ganga Basin", "gw": 18.2, "trend": -25, "cat": "Semi-Critical", "rain": 750, "soil": "Alluvial Loam", "slope": 1.3, "stage": 88.5, "demand": 640},

    # Moradabad & Bareilly (Rohilkhand)
    {"id": "amroha", "name": "Amroha", "division": "Moradabad", "region": "Rohilkhand", "lat": 28.90, "lng": 78.47, "area": 2249, "basin": "Ganga & Ban", "gw": 15.6, "trend": -20, "cat": "Semi-Critical", "rain": 890, "soil": "Silt Loam", "slope": 1.2, "stage": 82.4, "demand": 390},
    {"id": "bijnor", "name": "Bijnor", "division": "Moradabad", "region": "Rohilkhand", "lat": 29.37, "lng": 78.13, "area": 4561, "basin": "Ganga & Malin", "gw": 11.2, "trend": -12, "cat": "Safe", "rain": 1050, "soil": "Coarse Alluvial Sand", "slope": 1.6, "stage": 64.2, "demand": 580},
    {"id": "moradabad", "name": "Moradabad", "division": "Moradabad", "region": "Rohilkhand", "lat": 28.83, "lng": 78.78, "area": 3718, "basin": "Ramganga Basin", "gw": 16.4, "trend": -24, "cat": "Semi-Critical", "rain": 920, "soil": "Ramganga Alluvium", "slope": 1.1, "stage": 86.8, "demand": 540},
    {"id": "rampur", "name": "Rampur", "division": "Moradabad", "region": "Rohilkhand", "lat": 28.81, "lng": 79.02, "area": 2367, "basin": "Kosi & Ramganga", "gw": 12.8, "trend": -15, "cat": "Safe", "rain": 960, "soil": "Fine Silt", "slope": 1.0, "stage": 68.5, "demand": 380},
    {"id": "sambhal", "name": "Sambhal", "division": "Moradabad", "region": "Rohilkhand", "lat": 28.58, "lng": 78.57, "area": 2453, "basin": "Sot & Ganga", "gw": 20.1, "trend": -32, "cat": "Critical", "rain": 810, "soil": "Sandy Loam", "slope": 1.1, "stage": 96.2, "demand": 410},
    {"id": "bareilly", "name": "Bareilly", "division": "Bareilly", "region": "Rohilkhand", "lat": 28.36, "lng": 79.41, "area": 4120, "basin": "Ramganga Basin", "gw": 13.9, "trend": -18, "cat": "Safe", "rain": 1020, "soil": "Fine Alluvial Silt", "slope": 1.3, "stage": 69.4, "demand": 620},
    {"id": "budaun", "name": "Budaun", "division": "Bareilly", "region": "Rohilkhand", "lat": 28.03, "lng": 79.12, "area": 5168, "basin": "Sot & Ganga", "gw": 17.5, "trend": -26, "cat": "Semi-Critical", "rain": 830, "soil": "Loamy Sand", "slope": 1.2, "stage": 87.1, "demand": 590},
    {"id": "pilibhit", "name": "Pilibhit", "division": "Bareilly", "region": "Rohilkhand", "lat": 28.63, "lng": 79.80, "area": 3686, "basin": "Gomti & Sharda", "gw": 7.4, "trend": -5, "cat": "Safe", "rain": 1250, "soil": "Terai Alluvium", "slope": 0.8, "stage": 48.6, "demand": 460},
    {"id": "shahjahanpur", "name": "Shahjahanpur", "division": "Bareilly", "region": "Rohilkhand", "lat": 27.88, "lng": 79.91, "area": 4388, "basin": "Garra & Ramganga", "gw": 12.1, "trend": -14, "cat": "Safe", "rain": 980, "soil": "Clayey Silt", "slope": 1.0, "stage": 65.3, "demand": 510},

    # Aligarh & Agra (Braj)
    {"id": "aligarh", "name": "Aligarh", "division": "Aligarh", "region": "Braj", "lat": 27.89, "lng": 78.08, "area": 3700, "basin": "Yamuna & Karwan", "gw": 23.4, "trend": -36, "cat": "Over-Exploited", "rain": 720, "soil": "Saline / Silt Loam", "slope": 1.2, "stage": 118.4, "demand": 560},
    {"id": "etah", "name": "Etah", "division": "Aligarh", "region": "Braj / Doab", "lat": 27.56, "lng": 78.66, "area": 2456, "basin": "Isan & Kali", "gw": 16.9, "trend": -22, "cat": "Semi-Critical", "rain": 740, "soil": "Alluvial Loam", "slope": 1.1, "stage": 84.2, "demand": 380},
    {"id": "hathras", "name": "Hathras", "division": "Aligarh", "region": "Braj", "lat": 27.60, "lng": 78.05, "area": 1840, "basin": "Karwan Basin", "gw": 24.1, "trend": -37, "cat": "Over-Exploited", "rain": 690, "soil": "Sandy Alluvium", "slope": 1.0, "stage": 128.6, "demand": 350},
    {"id": "kasganj", "name": "Kasganj", "division": "Aligarh", "region": "Braj / Doab", "lat": 27.80, "lng": 78.64, "area": 1955, "basin": "Ganga & Kali", "gw": 15.3, "trend": -19, "cat": "Safe", "rain": 780, "soil": "Alluvial Silt", "slope": 1.1, "stage": 69.8, "demand": 310},
    {"id": "agra", "name": "Agra", "division": "Agra", "region": "Braj", "lat": 27.18, "lng": 78.00, "area": 4041, "basin": "Yamuna & Utangan", "gw": 27.8, "trend": -44, "cat": "Over-Exploited", "rain": 670, "soil": "Alluvial Sandy Loam", "slope": 1.8, "stage": 134.5, "demand": 680},
    {"id": "firozabad", "name": "Firozabad", "division": "Agra", "region": "Braj", "lat": 27.15, "lng": 78.39, "area": 2407, "basin": "Yamuna & Sirsa", "gw": 25.6, "trend": -40, "cat": "Over-Exploited", "rain": 690, "soil": "Sandy Silt", "slope": 1.5, "stage": 126.8, "demand": 420},
    {"id": "mainpuri", "name": "Mainpuri", "division": "Agra", "region": "Braj / Doab", "lat": 27.23, "lng": 79.02, "area": 2760, "basin": "Isan & Arind", "gw": 17.2, "trend": -21, "cat": "Semi-Critical", "rain": 760, "soil": "Alluvial Loam", "slope": 1.2, "stage": 86.4, "demand": 390},
    {"id": "mathura", "name": "Mathura", "division": "Agra", "region": "Braj", "lat": 27.49, "lng": 77.67, "area": 3329, "basin": "Yamuna Basin", "gw": 22.9, "trend": -34, "cat": "Critical", "rain": 610, "soil": "Saline Sandy Loam", "slope": 1.4, "stage": 98.7, "demand": 540},

    # Kanpur & Central Doab
    {"id": "auraiya", "name": "Auraiya", "division": "Kanpur", "region": "Doab", "lat": 26.46, "lng": 79.51, "area": 2016, "basin": "Yamuna & Sengar", "gw": 16.5, "trend": -20, "cat": "Semi-Critical", "rain": 780, "soil": "Ravine Silt Alluvium", "slope": 2.2, "stage": 81.5, "demand": 320},
    {"id": "etawah", "name": "Etawah", "division": "Kanpur", "region": "Doab", "lat": 26.78, "lng": 79.03, "area": 2311, "basin": "Chambal & Yamuna", "gw": 18.4, "trend": -24, "cat": "Semi-Critical", "rain": 750, "soil": "Chambal Ravine Silt", "slope": 2.5, "stage": 84.8, "demand": 360},
    {"id": "farrukhabad", "name": "Farrukhabad", "division": "Kanpur", "region": "Doab", "lat": 27.38, "lng": 79.58, "area": 2183, "basin": "Ganga & Ramganga", "gw": 13.5, "trend": -16, "cat": "Safe", "rain": 820, "soil": "Alluvial Fine Sand", "slope": 1.1, "stage": 67.2, "demand": 370},
    {"id": "kannauj", "name": "Kannauj", "division": "Kanpur", "region": "Doab", "lat": 27.05, "lng": 79.91, "area": 2093, "basin": "Ganga & Kali", "gw": 14.8, "trend": -18, "cat": "Safe", "rain": 840, "soil": "Alluvial Loam", "slope": 1.2, "stage": 69.5, "demand": 350},
    {"id": "kanpur-dehat", "name": "Kanpur Dehat", "division": "Kanpur", "region": "Doab", "lat": 26.44, "lng": 79.95, "area": 3021, "basin": "Yamuna & Rind", "gw": 17.8, "trend": -23, "cat": "Semi-Critical", "rain": 810, "soil": "Indo-Gangetic Alluvium", "slope": 1.3, "stage": 86.0, "demand": 410},
    {"id": "kanpur-nagar", "name": "Kanpur Nagar", "division": "Kanpur", "region": "Doab", "lat": 26.45, "lng": 80.33, "area": 3155, "basin": "Ganga & Pandu", "gw": 24.3, "trend": -39, "cat": "Critical", "rain": 820, "soil": "Alluvial Heavy Clay", "slope": 1.1, "stage": 98.2, "demand": 780},

    # Lucknow & Awadh
    {"id": "hardoi", "name": "Hardoi", "division": "Lucknow", "region": "Awadh", "lat": 27.39, "lng": 80.13, "area": 5986, "basin": "Gomti & Sai", "gw": 11.9, "trend": -14, "cat": "Safe", "rain": 910, "soil": "Alluvial Loam", "slope": 1.0, "stage": 62.4, "demand": 620},
    {"id": "kheri", "name": "Lakhimpur Kheri", "division": "Lucknow", "region": "Terai / Awadh", "lat": 27.94, "lng": 80.77, "area": 7680, "basin": "Sharda & Ghaghara", "gw": 6.8, "trend": -4, "cat": "Safe", "rain": 1280, "soil": "Terai Clayey Loam", "slope": 0.6, "stage": 38.5, "demand": 590},
    {"id": "lucknow", "name": "Lucknow", "division": "Lucknow", "region": "Awadh", "lat": 26.84, "lng": 80.94, "area": 2528, "basin": "Gomti Basin", "gw": 21.6, "trend": -36, "cat": "Critical", "rain": 890, "soil": "Gomti Alluvial Silt", "slope": 1.1, "stage": 97.4, "demand": 690},
    {"id": "raebareli", "name": "Raebareli", "division": "Lucknow", "region": "Awadh", "lat": 26.22, "lng": 81.24, "area": 4609, "basin": "Ganga & Sai", "gw": 15.1, "trend": -19, "cat": "Semi-Critical", "rain": 870, "soil": "Alluvial Clay Loam", "slope": 1.2, "stage": 79.2, "demand": 480},
    {"id": "sitapur", "name": "Sitapur", "division": "Lucknow", "region": "Awadh", "lat": 27.56, "lng": 80.68, "area": 5743, "basin": "Gomti & Sarayan", "gw": 9.2, "trend": -8, "cat": "Safe", "rain": 1050, "soil": "Alluvial Silt", "slope": 0.9, "stage": 54.1, "demand": 560},
    {"id": "unnao", "name": "Unnao", "division": "Lucknow", "region": "Awadh", "lat": 26.54, "lng": 80.49, "area": 4558, "basin": "Ganga & Sai", "gw": 16.2, "trend": -21, "cat": "Semi-Critical", "rain": 850, "soil": "Alluvial Silt Loam", "slope": 1.1, "stage": 83.5, "demand": 510},

    # Ayodhya & Devipatan
    {"id": "amethi", "name": "Amethi", "division": "Ayodhya", "region": "Awadh", "lat": 26.15, "lng": 81.81, "area": 2329, "basin": "Gomti & Sai", "gw": 14.2, "trend": -17, "cat": "Safe", "rain": 930, "soil": "Alluvial Loam", "slope": 1.1, "stage": 68.2, "demand": 340},
    {"id": "ayodhya", "name": "Ayodhya", "division": "Ayodhya", "region": "Awadh", "lat": 26.79, "lng": 82.19, "area": 2341, "basin": "Saryu (Ghaghara)", "gw": 10.4, "trend": -10, "cat": "Safe", "rain": 1040, "soil": "Saryu Alluvium", "slope": 1.0, "stage": 58.4, "demand": 410},
    {"id": "barabanki", "name": "Barabanki", "division": "Ayodhya", "region": "Awadh", "lat": 26.92, "lng": 81.18, "area": 4402, "basin": "Ghaghara & Gomti", "gw": 12.4, "trend": -15, "cat": "Safe", "rain": 970, "soil": "Alluvial Loam", "slope": 1.0, "stage": 64.8, "demand": 490},
    {"id": "sultanpur", "name": "Sultanpur", "division": "Ayodhya", "region": "Awadh", "lat": 26.26, "lng": 82.07, "area": 2673, "basin": "Gomti Basin", "gw": 13.8, "trend": -16, "cat": "Safe", "rain": 950, "soil": "Gomti Alluvium", "slope": 1.1, "stage": 67.5, "demand": 390},
    {"id": "ambedkar-nagar", "name": "Ambedkar Nagar", "division": "Ayodhya", "region": "Awadh", "lat": 26.44, "lng": 82.69, "area": 2350, "basin": "Ghaghara & Majhoi", "gw": 11.5, "trend": -12, "cat": "Safe", "rain": 990, "soil": "Alluvial Silt", "slope": 1.0, "stage": 61.2, "demand": 360},
    {"id": "bahraich", "name": "Bahraich", "division": "Devipatan", "region": "Terai", "lat": 27.57, "lng": 81.59, "area": 4697, "basin": "Ghaghara & Saryu", "gw": 7.9, "trend": -6, "cat": "Safe", "rain": 1210, "soil": "Terai Silt", "slope": 0.7, "stage": 44.8, "demand": 470},
    {"id": "balrampur", "name": "Balrampur", "division": "Devipatan", "region": "Terai", "lat": 27.43, "lng": 82.18, "area": 3349, "basin": "Rapti Basin", "gw": 6.5, "trend": -4, "cat": "Safe", "rain": 1320, "soil": "Terai Clay", "slope": 0.8, "stage": 36.2, "demand": 380},
    {"id": "gonda", "name": "Gonda", "division": "Devipatan", "region": "Terai", "lat": 27.13, "lng": 81.96, "area": 3404, "basin": "Ghaghara & Kuwana", "gw": 9.8, "trend": -9, "cat": "Safe", "rain": 1100, "soil": "Alluvial Loam", "slope": 0.9, "stage": 52.6, "demand": 440},
    {"id": "shravasti", "name": "Shravasti", "division": "Devipatan", "region": "Terai", "lat": 27.50, "lng": 82.03, "area": 1640, "basin": "Rapti Basin", "gw": 6.9, "trend": -5, "cat": "Safe", "rain": 1290, "soil": "Terai Alluvium", "slope": 0.8, "stage": 39.4, "demand": 240},

    # Gorakhpur & Basti
    {"id": "basti", "name": "Basti", "division": "Basti", "region": "Purvanchal", "lat": 26.80, "lng": 82.76, "area": 2688, "basin": "Kuwano & Manorama", "gw": 10.6, "trend": -11, "cat": "Safe", "rain": 1060, "soil": "Alluvial Silt", "slope": 1.0, "stage": 56.8, "demand": 420},
    {"id": "sant-kabir-nagar", "name": "Sant Kabir Nagar", "division": "Basti", "region": "Purvanchal", "lat": 26.77, "lng": 83.03, "area": 1646, "basin": "Ami & Kuwano", "gw": 10.1, "trend": -9, "cat": "Safe", "rain": 1090, "soil": "Alluvial Loam", "slope": 0.9, "stage": 53.4, "demand": 280},
    {"id": "siddharthnagar", "name": "Siddharthnagar", "division": "Basti", "region": "Terai", "lat": 27.29, "lng": 82.81, "area": 2895, "basin": "Rapti & Banganga", "gw": 5.9, "trend": -3, "cat": "Safe", "rain": 1340, "soil": "Terai Clay", "slope": 0.7, "stage": 32.5, "demand": 360},
    {"id": "deoria", "name": "Deoria", "division": "Gorakhpur", "region": "Purvanchal", "lat": 26.50, "lng": 83.78, "area": 2540, "basin": "Ghaghara & Little Gandak", "gw": 8.7, "trend": -8, "cat": "Safe", "rain": 1140, "soil": "Gandak Alluvium", "slope": 0.9, "stage": 49.2, "demand": 440},
    {"id": "gorakhpur", "name": "Gorakhpur", "division": "Gorakhpur", "region": "Purvanchal", "lat": 26.76, "lng": 83.37, "area": 3321, "basin": "Rapti & Rohini", "gw": 8.1, "trend": -7, "cat": "Safe", "rain": 1210, "soil": "Rapti Silt Loam", "slope": 0.8, "stage": 46.5, "demand": 580},
    {"id": "kushinagar", "name": "Kushinagar", "division": "Gorakhpur", "region": "Purvanchal", "lat": 26.74, "lng": 83.89, "area": 2905, "basin": "Great Gandak & Little Gandak", "gw": 7.2, "trend": -5, "cat": "Safe", "rain": 1220, "soil": "Gandak Alluvium", "slope": 0.8, "stage": 42.1, "demand": 460},
    {"id": "maharajganj", "name": "Maharajganj", "division": "Gorakhpur", "region": "Terai", "lat": 27.14, "lng": 83.56, "area": 2952, "basin": "Rohini & Gandak", "gw": 6.1, "trend": -4, "cat": "Safe", "rain": 1390, "soil": "Terai Alluvium", "slope": 0.7, "stage": 34.0, "demand": 390},

    # Azamgarh & Varanasi
    {"id": "azamgarh", "name": "Azamgarh", "division": "Azamgarh", "region": "Purvanchal", "lat": 26.06, "lng": 83.18, "area": 4054, "basin": "Tons & Ghaghara", "gw": 12.7, "trend": -15, "cat": "Safe", "rain": 1010, "soil": "Alluvial Clay Loam", "slope": 1.0, "stage": 66.8, "demand": 590},
    {"id": "ballia", "name": "Ballia", "division": "Azamgarh", "region": "Purvanchal", "lat": 25.76, "lng": 84.15, "area": 2981, "basin": "Ganga & Ghaghara Confluence", "gw": 9.4, "trend": -9, "cat": "Safe", "rain": 1050, "soil": "Floodplain Silt", "slope": 0.8, "stage": 52.4, "demand": 470},
    {"id": "mau", "name": "Mau", "division": "Azamgarh", "region": "Purvanchal", "lat": 26.00, "lng": 83.56, "area": 1713, "basin": "Tons Basin", "gw": 11.2, "trend": -13, "cat": "Safe", "rain": 1030, "soil": "Alluvial Loam", "slope": 1.0, "stage": 59.8, "demand": 310},
    {"id": "chandauli", "name": "Chandauli", "division": "Varanasi", "region": "Purvanchal", "lat": 25.26, "lng": 83.27, "area": 2541, "basin": "Ganga & Karamnasa", "gw": 13.1, "trend": -16, "cat": "Safe", "rain": 1080, "soil": "Rice Bowl Heavy Clay", "slope": 1.3, "stage": 65.4, "demand": 410},
    {"id": "ghazipur", "name": "Ghazipur", "division": "Varanasi", "region": "Purvanchal", "lat": 25.58, "lng": 83.57, "area": 3377, "basin": "Ganga & Gomti", "gw": 11.8, "trend": -14, "cat": "Safe", "rain": 1030, "soil": "Ganga Alluvial Silt", "slope": 1.1, "stage": 62.0, "demand": 480},
    {"id": "jaunpur", "name": "Jaunpur", "division": "Varanasi", "region": "Purvanchal", "lat": 25.75, "lng": 82.68, "area": 4038, "basin": "Gomti & Sai", "gw": 14.5, "trend": -18, "cat": "Safe", "rain": 980, "soil": "Alluvial Silt", "slope": 1.1, "stage": 71.5, "demand": 560},
    {"id": "varanasi", "name": "Varanasi", "division": "Varanasi", "region": "Purvanchal", "lat": 25.32, "lng": 82.97, "area": 1535, "basin": "Ganga, Varuna & Assi", "gw": 18.9, "trend": -27, "cat": "Critical", "rain": 1010, "soil": "Ganga Silt Loam", "slope": 1.4, "stage": 92.4, "demand": 540},

    # Mirzapur & Vindhya
    {"id": "mirzapur", "name": "Mirzapur", "division": "Mirzapur", "region": "Vindhya", "lat": 25.15, "lng": 82.57, "area": 4405, "basin": "Ganga & Belan", "gw": 17.2, "trend": -21, "cat": "Semi-Critical", "rain": 940, "soil": "Vindhyan Red Clay & Rock", "slope": 3.4, "stage": 81.2, "demand": 460},
    {"id": "bhadohi", "name": "Sant Ravidas Nagar (Bhadohi)", "division": "Mirzapur", "region": "Purvanchal", "lat": 25.39, "lng": 82.57, "area": 1015, "basin": "Ganga & Varuna", "gw": 14.1, "trend": -17, "cat": "Safe", "rain": 970, "soil": "Alluvial Silt", "slope": 1.2, "stage": 69.8, "demand": 260},
    {"id": "sonbhadra", "name": "Sonbhadra", "division": "Mirzapur", "region": "Vindhya", "lat": 24.68, "lng": 83.06, "area": 6788, "basin": "Son & Rihand", "gw": 12.5, "trend": -14, "cat": "Safe", "rain": 1090, "soil": "Hard Rock Sandstone", "slope": 4.8, "stage": 58.2, "demand": 510},

    # Prayagraj & Chitrakoot
    {"id": "fatehpur", "name": "Fatehpur", "division": "Prayagraj", "region": "Doab", "lat": 25.93, "lng": 80.81, "area": 4152, "basin": "Ganga & Yamuna", "gw": 16.8, "trend": -22, "cat": "Semi-Critical", "rain": 860, "soil": "Doab Alluvium", "slope": 1.2, "stage": 83.1, "demand": 470},
    {"id": "kaushambi", "name": "Kaushambi", "division": "Prayagraj", "region": "Doab", "lat": 25.53, "lng": 81.38, "area": 2012, "basin": "Yamuna & Sasur Khaderi", "gw": 17.4, "trend": -23, "cat": "Semi-Critical", "rain": 890, "soil": "Sandy Alluvium", "slope": 1.3, "stage": 85.6, "demand": 330},
    {"id": "pratapgarh", "name": "Pratapgarh", "division": "Prayagraj", "region": "Awadh / Purvanchal", "lat": 25.90, "lng": 81.99, "area": 3717, "basin": "Sai & Bakulahi", "gw": 13.8, "trend": -16, "cat": "Safe", "rain": 940, "soil": "Alluvial Loam", "slope": 1.1, "stage": 68.4, "demand": 460},
    {"id": "prayagraj", "name": "Prayagraj", "division": "Prayagraj", "region": "Doab / Sangam", "lat": 25.43, "lng": 81.84, "area": 5482, "basin": "Ganga & Yamuna Confluence", "gw": 19.3, "trend": -29, "cat": "Critical", "rain": 960, "soil": "Sangam Silt Alluvium", "slope": 1.3, "stage": 94.2, "demand": 740},

    # Bundelkhand
    {"id": "banda", "name": "Banda", "division": "Chitrakoot", "region": "Bundelkhand", "lat": 25.48, "lng": 80.33, "area": 4408, "basin": "Ken & Baghein", "gw": 18.6, "trend": -24, "cat": "Critical", "rain": 870, "soil": "Mixed Red & Black Soil", "slope": 3.2, "stage": 91.5, "demand": 450},
    {"id": "chitrakoot", "name": "Chitrakoot", "division": "Chitrakoot", "region": "Bundelkhand", "lat": 25.20, "lng": 80.92, "area": 3216, "basin": "Mandakini & Paisuni", "gw": 15.4, "trend": -19, "cat": "Semi-Critical", "rain": 930, "soil": "Bundelkhand Gneiss / Granite", "slope": 3.6, "stage": 78.4, "demand": 340},
    {"id": "hamirpur", "name": "Hamirpur", "division": "Chitrakoot", "region": "Bundelkhand", "lat": 25.95, "lng": 80.15, "area": 4121, "basin": "Yamuna & Betwa Confluence", "gw": 19.1, "trend": -25, "cat": "Critical", "rain": 820, "soil": "Black Cotton Soil", "slope": 2.8, "stage": 92.8, "demand": 410},
    {"id": "mahoba", "name": "Mahoba", "division": "Chitrakoot", "region": "Bundelkhand", "lat": 25.29, "lng": 79.87, "area": 3144, "basin": "Dhasan & Chandela Lakes", "gw": 20.8, "trend": -31, "cat": "Critical", "rain": 810, "soil": "Granitic Hard Rock", "slope": 3.8, "stage": 96.0, "demand": 350},
    {"id": "jalaun", "name": "Jalaun", "division": "Jhansi", "region": "Bundelkhand", "lat": 26.15, "lng": 79.35, "area": 4565, "basin": "Yamuna & Betwa", "gw": 18.2, "trend": -23, "cat": "Semi-Critical", "rain": 770, "soil": "Mixed Red Soil", "slope": 2.6, "stage": 86.4, "demand": 430},
    {"id": "jhansi", "name": "Jhansi", "division": "Jhansi", "region": "Bundelkhand", "lat": 25.44, "lng": 78.56, "area": 5024, "basin": "Betwa & Pahuj", "gw": 21.2, "trend": -28, "cat": "Critical", "rain": 840, "soil": "Bundelkhand Granitic Complex", "slope": 4.5, "stage": 95.8, "demand": 560},
    {"id": "lalitpur", "name": "Lalitpur", "division": "Jhansi", "region": "Bundelkhand", "lat": 24.69, "lng": 78.41, "area": 5039, "basin": "Betwa & Jamni", "gw": 17.9, "trend": -22, "cat": "Semi-Critical", "rain": 880, "soil": "Hard Rock / Basalt", "slope": 4.1, "stage": 84.5, "demand": 480},
]

MIN_LNG = 77.0
MAX_LNG = 84.4
MIN_LAT = 23.8
MAX_LAT = 30.5
WIDTH = 920
HEIGHT = 760

def project(lat, lng):
    x = (lng - MIN_LNG) / (MAX_LNG - MIN_LNG) * (WIDTH - 120) + 60
    y = (MAX_LAT - lat) / (MAX_LAT - MIN_LAT) * (HEIGHT - 120) + 60
    return round(x, 1), round(y, 1)

# Generate temporal hydrological trajectory (2000 to 2035) for each district
def get_temporal_trajectory(current_depth, trend_annual_cm):
    trend_m_yr = trend_annual_cm / 100.0  # negative means depletion
    # Years: 2000, 2005, 2010, 2015, 2020, 2024, 2026 (current), 2028, 2030, 2035
    trajectory = []
    years = [2000, 2005, 2010, 2015, 2020, 2024, 2026, 2028, 2030, 2035]
    for yr in years:
        years_diff = yr - 2026
        # Projected depth
        d = round(max(3.0, current_depth - (trend_m_yr * years_diff)), 2)
        # Compute stress score (0-100)
        stress = round(min(100, max(10, (d * 2.5) + (abs(trend_annual_cm) * 0.7))), 1)
        # Category
        cat = "Over-Exploited" if stress >= 75 else "Critical" if stress >= 55 else "Semi-Critical" if stress >= 35 else "Safe"
        trajectory.append({
            "year": yr,
            "depth_m": d,
            "stress_score": stress,
            "category": cat,
            "phase": "Historical" if yr < 2026 else "Current Baseline" if yr == 2026 else "AI Projected Horizon"
        })
    return trajectory

# Recommended engineering interventions by region and soil
def get_recharge_plan(district_name, soil, slope, current_depth):
    plans = [
        {
            "structure": "Deep Injection Well with Desilting Chamber",
            "capacity_m3_yr": 1250,
            "unit_cost_inr": 85000,
            "suitability": 94 if "Alluvium" in soil or "Alluvial" in soil else 68,
            "target": "Replenishes deep unconfined aquifer zone."
        },
        {
            "structure": "Multi-Layered Filter Recharge Pit",
            "capacity_m3_yr": 550,
            "unit_cost_inr": 35000,
            "suitability": 90,
            "target": "Captures urban & institutional rooftop runoff."
        },
        {
            "structure": "Check Dam / Gully Plug",
            "capacity_m3_yr": 9200,
            "unit_cost_inr": 380000,
            "suitability": 95 if slope > 2.5 else 50,
            "target": "Impounds seasonal storm discharge along stream beds."
        },
        {
            "structure": "Amrit Sarovar / Percolation Pond Renovation",
            "capacity_m3_yr": 5400,
            "unit_cost_inr": 240000,
            "suitability": 86,
            "target": "Village community depression revival and silt removal."
        }
    ]
    return sorted(plans, key=lambda x: x["suitability"], reverse=True)

districts_data = []
for d in UP_DISTRICTS_RAW:
    cx, cy = project(d["lat"], d["lng"])
    r = math.sqrt(d["area"]) * 0.42
    points = []
    angles = [0, 45, 90, 135, 180, 225, 270, 315]
    h = hash(d["id"]) % 100
    for idx, ang in enumerate(angles):
        rad = math.radians(ang)
        var = 0.85 + (((h + idx * 17) % 30) / 100.0)
        px = cx + math.cos(rad) * r * var
        py = cy + math.sin(rad) * r * var * 0.85
        points.append(f"{round(px, 1)},{round(py, 1)}")
    poly_svg = "M " + " L ".join(points) + " Z"

    stress = round(min(98, max(12, (d["gw"] * 2.2) + (abs(d["trend"]) * 0.8) - ((d["rain"] - 600) / 35.0))), 1)
    recharge_suitability = round(max(30, min(96, 88 - (d["slope"] * 3.0) + (8 if "Alluvial" in d["soil"] else -4))), 1)
    status_map = {
        "Safe": "good",
        "Semi-Critical": "warning",
        "Critical": "warning",
        "Over-Exploited": "critical"
    }
    water_status = status_map.get(d["cat"], "warning")

    districts_data.append({
        "id": d["id"],
        "name": d["name"],
        "division": d["division"],
        "region": d["region"],
        "coordinates": {"lat": d["lat"], "lng": d["lng"]},
        "waterStatus": water_status,
        "centroid": [d["lat"], d["lng"]],
        "projected": [cx, cy],
        "svgPath": poly_svg,
        "areaKm2": d["area"],
        "soilType": d["soil"],
        "slopePct": d["slope"],
        "rechargeSuitabilityScore": recharge_suitability,
        "temporalTrajectory": get_temporal_trajectory(d["gw"], d["trend"]),
        "modernWaterMetrics": {
            "groundwaterDepthM": d["gw"],
            "groundwaterTrendAnnualCm": d["trend"],
            "cgwbCategory": d["cat"],
            "cgwbStageExtractionPct": d["stage"],
            "waterStressScore": stress,
            "majorRiverBasin": d["basin"],
            "avgRainfallMm": d["rain"],
            "annualDemandMcm": d["demand"],
            "rainfallDeparturePct": round(((d["rain"] - 950) / 950.0) * 100, 1)
        },
        "recommendedRechargeStructures": get_recharge_plan(d["name"], d["soil"], d["slope"], d["gw"])
    })

ts_code = f"""/**
 * JalRakshak AI — 75 Uttar Pradesh Districts Hydrological & Planning Horizons Dataset
 * B.Tech CSE (Data Science + AI) Major Project Engine
 * Covers all 75 UP districts with temporal trajectories (2000 to 2035),
 * CGWB extraction stage, recharge suitability, soil, slope, and recommended structures.
 */

export interface TemporalDataPoint {{
  year: number;
  depth_m: number;
  stress_score: number;
  category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited";
  phase: string;
}}

export interface RecommendedStructureItem {{
  structure: string;
  capacity_m3_yr: number;
  unit_cost_inr: number;
  suitability: number;
  target: string;
}}

export interface ModernWaterMetrics {{
  groundwaterDepthM: number;
  groundwaterTrendAnnualCm: number;
  cgwbCategory: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited";
  cgwbStageExtractionPct: number;
  waterStressScore: number;
  majorRiverBasin: string;
  avgRainfallMm: number;
  annualDemandMcm: number;
  rainfallDeparturePct: number;
}}

export interface DistrictWaterEntity {{
  id: string;
  name: string;
  division?: string;
  region?: string;
  coordinates?: {{ lat: number; lng: number }};
  waterStatus?: "good" | "critical" | "warning";
  centroid?: [number, number]; // [lat, lng]
  projected?: [number, number]; // [svgX, svgY]
  svgPath?: string;
  areaKm2?: number;
  soilType?: string;
  slopePct?: number;
  rechargeSuitabilityScore?: number;
  temporalTrajectory?: TemporalDataPoint[];
  modernWaterMetrics?: ModernWaterMetrics;
  recommendedRechargeStructures?: RecommendedStructureItem[];
}}

export const UP_75_WATER_DISTRICTS: DistrictWaterEntity[] = {json.dumps(districts_data, indent=2)};

export const PLANNING_HORIZONS = [
  {{ id: "h_2000", label: "2000 Baseline", year: 2000, desc: "Pre-Tubewell Boom Baseline: Shallow water table, stable unconfined aquifers." }},
  {{ id: "h_2010", label: "2010 Tubewell Surge", year: 2010, desc: "Rapid agricultural electrification; initial overdraft in Upper Doab & Braj." }},
  {{ id: "h_2020", label: "2020 Stress Surge", year: 2020, desc: "Emergence of over-exploited blocks across NCR, Western UP & Bundelkhand." }},
  {{ id: "h_2026", label: "2026 Live Telemetry", year: 2026, desc: "Current real-time observation horizon with CGWB & IoT monitoring nodes." }},
  {{ id: "h_2028", label: "2028 +2Y ML Forecast", year: 2028, desc: "XGBoost + LSTM multi-horizon prediction under existing extraction rates." }},
  {{ id: "h_2030", label: "2030 +4Y Decadal Target", year: 2030, desc: "Critical planning threshold for Atal Bhujal Yojana & Amrit Sarovar impact." }},
  {{ id: "h_2035", label: "2035 Climate Horizon", year: 2035, desc: "Long-term climate change projection without intervention mitigation." }}
];

export const UP_75_DISTRICTS = UP_75_WATER_DISTRICTS;
export type DistrictAtlasEntity = DistrictWaterEntity;
export const ERA_PRESETS = PLANNING_HORIZONS;
"""

import os
os.makedirs("apps/web/src/data", exist_ok=True)
with open("apps/web/src/data/up-75-districts.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

os.makedirs("src/data", exist_ok=True)
with open("src/data/up-75-districts.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Successfully regenerated apps/web/src/data/up-75-districts.ts and src/data/up-75-districts.ts with pure water resource & planning horizons data!")

