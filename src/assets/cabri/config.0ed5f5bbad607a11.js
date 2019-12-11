"use strict";

var Presets = {
    Primary: {
        Numbers: {
            MaxInputDigits:     10,             // 9 999 999 999
            MaxPrecision:       2,
            LimitPrecisionInput: true,
            Precision:          2,
            CanSetPrecision:    false,
            InfinitySymbol:     "###",
            MaxCapacity:        100000000,          // 100 000 000,  i.e. <= 99 999 999  cf doc MEN "Utiliser les calculatrices en classe" Annexe 2
            ScientificNotation: false,
            AdvUnitsManagement: false
        },
        Calculator: {
            DivisionSign:   "\u00F7",               // DIVISION SIGN  �
            Level:          1,
            Docked: true
        },
        Strings: {
            "help_url": {
                fr: "help/primary/fr"
            },
            vector_tool: {
                en: "Arrow",
                fr: "Fl�che"
            },
            dilation_tool: {
                de: ["Zentrische Streckung", "Streckung"],
                en: ["Enlargement", "Enlarg."],
                es: "Ampliaci�n",
                fr: ["Agrandissement<BR>r�duction", "Aggr.-R�duc."],
                it: ["Ingrandimento/riduzione","Ingrand.<BR>Riduz."],
            }
        }
    },
    Secondary: {
        Numbers: {
            MaxInputDigits:     15,            // 999 999 999 999 999 + 1 == 10^15
            MaxPrecision:       10,
            LimitPrecisionInput: false,
            Precision:          10,
            CanSetPrecision:    true,
            InfinitySymbol:     "\u221E",
            MaxCapacity:        Infinity,
            ScientificNotation: true,
            AdvUnitsManagement: true
        },
        Calculator: {
            DivisionSign:   "/",
            Level:          2,
            Docked:         true
        }
    }
};
Presets.Current = Presets[Globals.Primary ? 'Primary' : 'Secondary'];

var CabriConfig = {
    CorsEnabled: false,
    CacheControl: undefined,
    Numbers: Presets.Current.Numbers,
    Calculator:Presets.Current.Calculator,
    showPiles: false
};
