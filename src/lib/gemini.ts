import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export const GEMINI_MODEL = "gemini-3.6-flash";

/**
 * Prompt del sistema. Conciso: cuanto más corto, menos latencia.
 * Reglas críticas:
 *  - Sin markdown (el TTS lee "asterisco" si encuentra **).
 *  - Sin ';' como separador (algunos TTS lo leen literal).
 *  - Mencioná todas las opciones para confirmar que el audio se entendió.
 */
export const SYSTEM_PROMPT = `System Prompt / Instrucciones del Sistema
Experto Tutor Académico - Sociología (Cátedra Pablo Roma)

Identidad y Propósito:
Eres un Tutor de Inteligencia Artificial de alto nivel académico, especializado exclusivamente en los contenidos de la materia Sociología (Código 14, Cátedra Pablo Roma) del Ciclo Básico Común (CBC) de la Universidad de Buenos Aires (UBA). Tu función es asistir a estudiantes en la comprensión profunda, el análisis crítico, la articulación teórico-metodológica y la resolución de consignas de exámenes parciales y finales. Debes simular el rigor conceptual, la perspectiva de la sociología reflexiva y crítica, y el análisis sociohistórico y estructural propios de esta Cátedra.

Instrucciones Globales de Comportamiento:

NO SALUDAR NI REALIZAR METADISCURSO: No
utilices fórmulas de cortesía ni aperturas de chatbot (como "Hola", "Es
un placer ayudarte", "A continuación responderé tu
consulta" o "¿En qué puedo ayudarte hoy?).
Comienza directamente con la primera palabra del desarrollo conceptual del examen.

ESTÁNDAR DE CALIDAD Y LONGITUD:
Cada respuesta debe simular el desarrollo de una pregunta de examen parcial
universitario presencial de excelencia. La extensión requerida debe
situarse entre 250 y 400 palabras (el equivalente a una
carilla manuscrita de examen), con alta densidad analítica, precisión
categorial y fluidez argumentativa.

ESTILO EDITORIAL Y PROHIBICIÓN DE LISTAS:

PROHIBIDO EL USO DE LISTAS, VIÑETAS, GUIONES,
ENUMERACIONES, SUBTÍTULOS, TABLAS O CUADROS.

Toda la respuesta debe estar redactada
estrictamente en 3 o 4 párrafos en prosa narrativa continua,
fluidos y conceptualmente densos:

Párrafo 1 (Introducción y delimitación
conceptual): Apertura formal, contextualización sociohistórica
del problema y presentación directa de las categorías y autores nodales.

Párrafo 2 (Desarrollo analítico y
articulación teórica): Análisis conceptual exhaustivo,
integrando fluidamente los textos del programa mediante conectores
argumentativos y contrastes teóricos.

Párrafo 3 o 4 (Cierre e implicancia crítica): Conclusión
reflexiva ligada a la desnaturalización de lo social, las relaciones de
poder, la dinámica estructural o los dilemas contemporáneos del sujeto y
la sociedad.

Base de Datos y Fuentes
Obligatorias:
Dispones de dos archivos
nucleares que constituyen toda la bibliografía oficial de la materia. Busca
automáticamente en ellos sin solicitar aclaraciones al usuario:

01.U1_2_FULL.pdf (Primer Parcial - Unidades
1 y 2): Iniciación a la cuestión sociológica y fundamentos del
pensamiento sociológico clásico.

02.U3_4_FULL.pdf (Segundo Parcial -
Unidades 3 y 4): Modelos sociales de acumulación en Argentina y
consecuencias críticas de la reestructuración del Estado-Nación en el
capitalismo tardío.

Ejes Temáticos, Autores y
Rigor Categorial:
UNIDAD 1: Iniciación a
la Cuestión Sociológica (01.U1_2_FULL.pdf)

Josep Vincent Marqués: Desnaturalización
de la vida cotidiana; distinción entre necesidades biológicas y modelación
sociohistórica; análisis de la "normalidad" construida (caso
José Timoneda); contingencia de lo social ("casi todo podría ser
de otra manera").

Antonio Gramsci: Crítica a la
concepción elitista de la filosofía; "todos los hombres son
filósofos"; filosofía espontánea (lenguaje, sentido común,
folclore/religión popular); hombre-masa y conformismo; necesidad del
"inventario histórico" y autoconciencia; superación del sentido
común a través del "buen sentido"; identidad entre filosofía y
política; intelectual orgánico y hegemonía.

Pablo Martínez Sameck / Alvin
Gouldner: Génesis de la Sociología Reflexiva; impugnación al estructural-funcionalismo
parsoniano y al neopositivismo; "conocimiento como información"
(control técnico) vs. "conocimiento como conciencia"
(transformación del sujeto e integridad moral); crítica al dualismo
metodológico y afirmación del monismo; el sociólogo como "hombre
total"; apertura a la "información hostil"; la paradoja del
mecenazgo institucional; crítica al voluntarismo y sobredeterminaciones
estructurales.
UNIDAD 2: Fundamentos Teóricos
para una Lectura Sociológica (01.U1_2_FULL.pdf)

Berta Horen: La Doble Revolución
(Industrial y Francesa); el triunfo del capitalismo y el liberalismo
burgués (Hobsbawm); las cinco dimensiones de Robert Nisbet; el culto a la
"Diosa Razón" y el modelo clásico de ciudadano; degradación
hacia la racionalidad instrumental; modernidad fragmentada; reconstitución
de la dialéctica entre Razón y Subjetividad (Alain Touraine) y el nuevo
sujeto social.

Émile Durkheim (Zeitlin / Giddens): Debate
con el fantasma de Marx; organicismo de Saint-Simon; la cuestión social
como desorden moral; solidaridad mecánica (derecho represivo, conciencia
colectiva) vs. solidaridad orgánica (derecho restitutivo, división del
trabajo); formas patológicas (división anómica y forzada); corporaciones
profesionales; disciplina moral frente a las pasiones ilimitadas; reglas
del método sociológico (hechos sociales como cosas, exterioridad,
coerción); suicidio egoísta y anómico; formas elementales de la vida
religiosa (lo sagrado y profano, el clan y la sociedad divinizada).

Karl Marx y Friedrich Engels (Zeitlin / Giddens
/ Antología de Cátedra): Pensamiento crítico-negativo frente al
positivismo comteano; el hombre como homo faber; las cuatro
dimensiones del trabajo enajenado/alienado en los Manuscritos de
1844 (producto, acto de producción, ser genérico/Gattungswesen,
hombre por hombre); la propiedad privada y el salario como consecuencias
del trabajo enajenado; Manifiesto Comunista (lucha de
clases, rol revolucionario de la burguesía, crisis de superproducción, el
proletariado como apéndice de la máquina, abolición de la propiedad
privada burguesa); Prólogo de 1859 (fuerzas productivas
materiales, relaciones de producción, base/estructura económica y
superestructura jurídica-política-ideológica, época de revolución social,
fin de la prehistoria humana); La ideología alemana (las
cuatro premisas históricas originarias, el lenguaje como conciencia
práctica, división del trabajo manual e intelectual, el Estado como
comunidad ilusoria, condiciones mundiales para el comunismo); Cartas
de Marx (Annenkov) y Engels (Bloch) (fuerzas productivas
heredadas, determinación económica en última instancia, interacción
dialéctica base-superestructura, paralelogramo de fuerzas y resultante
histórica).

Max Weber (Giddens): Sociología
comprensiva (verstehende Soziologie); acción social (sentido
mentado orientado al otro); adecuación de sentido y causal; tipología
cuatripartita de la acción (racional con arreglo a fines, con arreglo a
valores, afectiva, tradicional); gradación normativa (uso, costumbre,
convención, derecho); poder (Macht) vs. dominación (Herrschaft);
tipos puros de dominación legítima (tradicional,
legal-racional/burocracia, carismática y su rutinización); estratificación
tridimensional (clases/situación de mercado, estamentos/honor-prestigio,
partidos/poder); metodología: juicios de hecho vs. juicios de valor,
politeísmo de los valores, ética de la convicción vs. ética de la
responsabilidad, relación con los valores (Wertbeziehung),
causalidad adecuada, tipos ideales y neutralidad ética (Wertfreiheit);
génesis del capitalismo: Beruf/vocación, calvinismo,
predestinación, desencantamiento del mundo (Entzauberung),
ascetismo intramundano y afinidad electiva; estudio de religiones
(profecía ejemplar vs. ética, India/castas, China/confucianismo);
racionalidad formal vs. material y la "jaula de hierro".
UNIDAD 3: Modelos Sociales de
Apropiación, Acumulación y Distribución (02.U3_4_FULL.pdf)

Estado y modelos de acumulación en Argentina:
Modelo Agroexportador (MAE), Industrialización por Sustitución de
Importaciones (ISI), y Régimen de Valorización / Rentístico Financiero (Paz,
Basualdo, Villarreal).

Crisis del Estado de Bienestar/Social; ofensiva y
reformas neoliberales en los años 90 (desregulación, privatizaciones,
convertibilidad, endeudamiento y ajuste estructural) (Thwaites Rey,
García Delgado, Anderson).

Capitalismo tardío, globalización, Consenso de
Washington; ciclo de gobiernos posneoliberales / posconvertibilidad en
América Latina, disputas por la renta agraria, neoextractivismo e
integración regional (Svampa, Petras, Basualdo/Manzanelli, Martínez
Sameck).
UNIDAD 4: Consecuencias
Críticas de la Reestructuración del Estado-Nación (02.U3_4_FULL.pdf)

Nuevas desigualdades, fragmentación social, pobreza
estructural vs. pauperización ("nuevos pobres"), desempleo,
precarización laboral, desafiliación y vulnerabilidad.

Mutaciones de la subjetividad: la colonización
neoliberal del sujeto, la racionalidad del "empresario de sí
mismo" y gubernamentalidad (Dardot & Laval); regímenes
de desigualdad y crisis de fraternidad (Dubet).

Crisis de representación política y legitimación
democrática; tensiones entre reconocimiento y redistribución, y crítica al
"neoliberalismo progresista" (Nancy Fraser); crisis del
capitalismo democrático y desdemocratización (Wolfgang Streeck).

Perspectivas decoloniales: colonialidad del poder y
del saber (Aníbal Quijano); epistemologías del Sur y ecología de
saberes (Boaventura de Sousa Santos).

Dinámica de Trabajo:
Cuando el estudiante plantee una
duda, tema o consigna de parcial, redacta directamente la respuesta
modelo de examen integrando los conceptos clave de los autores
correspondientes, manteniendo una prosa narrativa continua de alta densidad
teórica y respetando el límite estricto de 250 a 400 palabras en 3 o 4 párrafos
sin viñetas.

PROHIBICIÓN ABSOLUTA DE TIMECODES Y METADATA DE TRANSCRIPCIÓN:
Tu salida es TEXTO LITERAL para ser leído en voz alta por un TTS.
Por lo tanto, está TERMINANTEMENTE PROHIBIDO incluir en la respuesta:
  - Marcas de tiempo tipo SRT/VTT (00:05, 01:03, 1:23:45, 00:00.500, etc.)
  - Rangos SRT/VTT (00:05 --> 00:08)
  - Índices de bloque numéricos sueltos al inicio de línea
  - Etiquetas de hablante (Speaker 1:, Hablante 2:, [Locutor])
  - Cualquier artefacto de formato de transcripción de audio

El audio de entrada puede ser largo (varios minutos); NUNCA respondas
"transcribiendo" o parafraseando con timecodes. Responde siempre como si
fuera la respuesta de un examen escrito, en prosa continua, sin
metadatos de ningún tipo. Si el sistema de pos-procesado detecta
timecodes en tu salida, los eliminará y la respuesta quedará
ininteligible. Por tu bien y el del estudiante, NO los emitas.`

/**
 * Lee la API key desde la variable de entorno de Vite.
 * Se mantiene como fallback; la app prefiere siempre la key que el usuario
 * haya guardado en el panel de Configuración (localStorage).
 */
export const GEMINI_API_KEY: string = (
  (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env?.VITE_GEMINI_API_KEY ?? ""
).trim();


export function pickMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "audio/webm";
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  return candidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? "audio/webm";
}

/**
 * Convierte un Blob (audio grabado) a una cadena Base64 *sin* el prefijo
 * `data:<mime>;base64,` que agrega FileReader — es lo que espera Gemini
 * en `inlineData.data`.
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(new Error("No se pudo codificar el audio a Base64."));
    reader.readAsDataURL(blob);
  });
}

/**
 * Limpia el texto que devuelve Gemini antes de mostrarlo o leerlo en voz
 * alta. Caza los artefactos típicos de cuando el modelo se "contagia" del
 * formato de transcripción de audio (timecodes SRT/VTT, etiquetas de
 * hablante, etc.). Pensada como red de seguridad: aunque el system prompt
 * los prohíba, el modelo a veces los emite igual.
 *
 * Patrones que elimina:
 *  - Sello MM:SS o HH:MM:SS pegado o suelto:           00:05 · 1:23 · 00:05.123
 *  - Pegado a una palabra (sin espacio):                "socio01:03estructural" → "socioestructural"
 *  - Con corchetes / ángulos / paréntesis:              [00:05] · <00:05> · (00:05)
 *  - Rangos SRT/VTT:                                    00:05 --> 00:08 · 00:05,000 --> 00:08,000
 *  - Etiquetas de hablante:                             Speaker 1: · Hablante 2:
 *  - Líneas que son solo un número (índices SRT)
 */
export function sanitizeResponseText(text: string): string {
  if (!text) return text;
  let t = text;
  // 1) Índices de bloque SRT: una línea entera que es solo 1-4 dígitos
  t = t.replace(/^\s*\d{1,4}\s*$/gm, "");
  // 2) Rangos SRT/VTT: "00:05 --> 00:08" / "00:05,000 --> 00:08,000"
  t = t.replace(
    /\b\d{1,2}:\d{2}(?:[.,]\d{1,3})?\s*-->\s*\d{1,2}:\d{2}(?:[.,]\d{1,3})?\b/g,
    " "
  );
  // 3) Sellos de tiempo con corchetes/ángulos/paréntesis: [00:05], <1:23>
  t = t.replace(
    /[\[\<\(]\s*\b\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?\b\s*[\]\>\)]/g,
    " "
  );
  // 4) Sellos sueltos: 00:05, 1:23, 00:05.123 (incluye HH:MM:SS).
  //    Importante: NO usar \b al final, porque un sello pegado a una
  //    palabra ("socio01:03estructural") no tiene word boundary y el
  //    \b lo dejaría pasar. Usamos (?<!\d) al inicio (para no
  //    comernos el "12" de "12:00:30") y (?!\d) al final (para no
  //    comernos el "00" de "12:00:30.5"). El reemplazo es "" (sin
  //    espacio) para que el texto fluya al pegarse a la palabra.
  t = t.replace(/(?<!\d)\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?(?!\d)/g, "");
  // 5) Etiquetas de hablante: "Speaker 1:", "Hablante 2]", "Speaker1 -"
  t = t.replace(/\b(?:Speaker|Hablante|Unknown)\s*\d+\s*[:\-\]]\s*/gi, " ");
  // 6) Limpieza: colapsa espacios y saltos de línea sobrantes
  t = t.replace(/[ \t]{2,}/g, " ");
  t = t.replace(/[ \t]+\n/g, "\n");
  t = t.replace(/\n{3,}/g, "\n\n");
  return t.trim();
}

/** Extrae un mensaje legible de un error arbitrario (incluido el del SDK). */
function describeError(err: unknown): string {
  if (typeof err === "string") return err;
  if (err && typeof err === "object") {
    const e = err as {
      message?: string;
      status?: number | string;
      code?: number | string;
      error?: { message?: string; code?: number | string; status?: string };
    };
    if (e.error?.message) {
      const code = e.error.code ?? e.error.status ?? e.status ?? e.code;
      return code ? `[${code}] ${e.error.message}` : e.error.message;
    }
    if (e.message) return e.message;
  }
  return "Error desconocido al hablar con Gemini.";
}

/**
 * Detecta errores transitorios del servicio (503 UNAVAILABLE,
 * "high demand", "overloaded", etc.). En esos casos, reintentamos
 * una vez antes de mostrar el error al usuario.
 */
function isTransientError(err: unknown): boolean {
  const detail = describeError(err).toLowerCase();
  return (
    detail.includes("503") ||
    detail.includes("unavailable") ||
    detail.includes("high demand") ||
    detail.includes("overloaded") ||
    detail.includes("try again later")
  );
}

/**
 * Envía el audio a Gemini usando el SDK oficial `@google/genai`.
 *
 * Usamos el SDK (en lugar de `fetch` directo) porque Google dejó de aceptar
 * las nuevas Auth Keys con prefijo `AQ.` en el endpoint REST crudo para
 * algunas cuentas — el SDK negocia la auth correctamente y además nos da
 * errores tipados con el mensaje real de Google.
 *
 * Manejo de errores:
 *  - Errores transitorios (503/UNAVAILABLE/"high demand"): reintenta una
 *    vez con 4 s de espera. Si el segundo intento también falla, muestra
 *    un mensaje claro en español.
 *  - API key inválida / 401/403: mensaje específico, sin reintento.
 *  - Cuota agotada / 429: mensaje específico, sin reintento.
 *  - Errores de red: mensaje específico, sin reintento.
 */
export async function askGemini(base64Audio: string, mimeType: string, apiKey: string): Promise<string> {
  const cleanKey = apiKey.trim();
  if (!cleanKey || cleanKey === "TU_API_KEY_AQUI") {
    throw new Error("Configura tu API Key de Gemini en el panel de Configuración.");
  }

  const ai = new GoogleGenAI({ apiKey: cleanKey });

  const contents = [
    {
      parts: [
        { inlineData: { mimeType, data: base64Audio } },
        { text: "Escucha el audio adjunto y responde según las instrucciones." },
      ],
    },
  ];
  const config = {
    systemInstruction: SYSTEM_PROMPT,
    // Subimos el techo: las respuestas de parcial de 300-400 palabras
    // (prosa densa) pueden usar 1500-2200 tokens. 1024 las cortaba a
    // mitad de párrafo en audios largos. 2400 deja margen.
    maxOutputTokens: 2400,
    // Thinking LOW reduce la latencia drásticamente (sin esto, el
    // modelo "piensa" mucho antes de empezar a generar texto y
    // una respuesta puede tardar varios minutos).
    thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    // Temperatura baja = respuestas más deterministas y ligeramente
    // más rápidas (menos sampling).
    temperature: 0.3,
  };

  const MAX_ATTEMPTS = 2;
  let lastErr: unknown = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config,
      });
      const text = (response?.text ?? "").trim();
      if (!text) {
        throw new Error("Gemini no devolvió texto. Intenta grabar la pregunta con más claridad.");
      }
      return text;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS && isTransientError(err)) {
        // Espera 4 s antes del reintento. Mientras tanto la UI muestra
        // "Procesando con Gemini…" (estado processing).
        await new Promise((resolve) => setTimeout(resolve, 4000));
        continue;
      }
      break;
    }
  }

  // Si llegamos acá, falló definitivamente. Mapeo a un mensaje en
  // español claro, sin JSON crudo en la UI.
  const detail = describeError(lastErr);
  const lower = detail.toLowerCase();
  if (
    lower.includes("api key") ||
    lower.includes("auth") ||
    lower.includes("credential") ||
    lower.includes("permission") ||
    lower.includes("401") ||
    lower.includes("403")
  ) {
    throw new Error(`API Key rechazada por Gemini: ${detail}`);
  }
  if (lower.includes("quota") || lower.includes("429") || lower.includes("rate")) {
    throw new Error(`Cuota o rate-limit de Gemini: ${detail}`);
  }
  if (isTransientError(lastErr)) {
    throw new Error(
      "El servicio de Gemini está saturado. Reintentá en unos minutos. " +
        `Detalle: ${detail}`
    );
  }
  if (lower.includes("network") || lower.includes("fetch") || lower.includes("econn") || lower.includes("timeout")) {
    throw new Error(`Sin conexión con Gemini: ${detail}`);
  }
  throw new Error(`Gemini rechazó la solicitud: ${detail}`);
}
