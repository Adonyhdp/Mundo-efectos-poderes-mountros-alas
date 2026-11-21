import JSZip from 'jszip';
import workflow from '../../.github/workflows/build-apk.yml?raw';
import capacitorConfig from '../../tools/android/capacitor.config.json?raw';

export async function generateAndroidApkKitZip(): Promise<Blob> {
  const zip = new JSZip();
  zip.file('.github/workflows/build-apk.yml', workflow);
  zip.file('tools/android/capacitor.config.json', capacitorConfig);
  zip.file('README_PASO_A_PASO.txt', [
    'Copia .github y tools al repositorio que ya contiene el juego y bun.lock.',
    'Actions genera un APK de prueba en Artifacts al subir a main o master.',
    'Para publicar un APK actualizable en Releases, configura estos secretos:',
    'ANDROID_KEYSTORE_BASE64, ANDROID_KEY_ALIAS, ANDROID_KEYSTORE_PASSWORD y ANDROID_KEY_PASSWORD.',
    'Usa la misma clave de firma cada vez. No subas la clave al repositorio.',
    'El APK nuevo usa archivos locales. Exporta tu partida desde el APK web anterior y luego impórtala desde el menú.',
  ].join('\n'));
  return zip.generateAsync({ type: 'blob' });
}
