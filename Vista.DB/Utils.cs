using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Vista.Models;

class Utils
{
  #region AesHelper:只能用於短期交換訊息。
  /// <summary>
  /// AesHelper:只能用於短期交換訊息。
  /// </summary>
  public static string AesSimpleEncrypt<TObject>(TObject payload, Int32 tag = 0)
  {
    using (var aes = GenAesKey(tag))
    {
      return Convert.ToBase64String(DoEncryptData(JsonSerializer.Serialize<TObject>(payload), aes));
    }
  }

  /// <summary>
  /// AesHelper:只能用於短期交換訊息。
  /// </summary>
  public static TObject AesSimpleDecrypt<TObject>(string cipher, Int32 tag = 0)
  {
    using (var aes = GenAesKey(tag))
    {
      return JsonSerializer.Deserialize<TObject>(DoDecryptData(Convert.FromBase64String(cipher), aes))!;
    }
  }

  /// <summary>
  /// only for [AesSimpleEncrypt]
  /// </summary>
  static byte[] DoEncryptData(string plainText, Aes aesAlg)
  {
    // Create an encryptor to perform the stream transform.
    ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

    // Create the streams used for encryption.
    using var msEncrypt = new MemoryStream();
    using var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write);
    using var swEncrypt = new StreamWriter(csEncrypt);

    //Write all data to the stream.
    swEncrypt.Write(RandomString(17) + plainText);
    swEncrypt.Close();

    return msEncrypt.ToArray();
  }

  /// <summary>
  /// only for [AesSimpleDecrypt]
  /// </summary>
  static string DoDecryptData(byte[] cipherText, Aes aesAlg)
  {
    // Create a decryptor to perform the stream transform.
    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

    // Create the streams used for decryption.
    using var msDecrypt = new MemoryStream(cipherText);
    using var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
    using var srDecrypt = new StreamReader(csDecrypt);

    // Read the decrypted bytes from the decrypting stream
    return srDecrypt.ReadToEnd()[17..];
  }

  /// <summary>
  /// only for [AesSimpleEncrypt,AesSimpleDecrypt]
  /// </summary>
  static Aes GenAesKey(Int32 salt = 0)
  {
    /// 產生只有當日有效的加密金鑰
    using var sha = new HMACSHA384(seed);
    DateTime d = DateTime.Today;
    string envprops = $"{11 - d.Day}{d:MMddyy}oBx39i{23 - d.DayOfWeek}x8ek{d.Day}a{43 - d.Day}7b*$X{d.DayOfWeek}3{10 - d.DayOfWeek}eo{salt}jk{37 - d.Month}erAbx{d.Year}4e6d{d.DayOfYear}3et2b5s%t{d.Month}&^y1d0O)a";
    var key48 = sha.ComputeHash(Encoding.ASCII.GetBytes(envprops));
    Aes aesAlg = Aes.Create();
    aesAlg.Key = key48[..32];
    aesAlg.IV = key48[32..];
    aesAlg.Mode = CipherMode.CFB;
    return aesAlg;
  }

  /// <summary>
  /// only for [AesSimpleEncrypt]
  /// </summary>
  static string RandomString(int length)
  {
    Random r = new Random((int)DateTime.Now.Ticks);
    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?";
    return new string(Enumerable.Repeat(chars, length).Select(s => s[r.Next(chars.Length)]).ToArray());
  }

  /// <summary>
  /// only for [JwtSimpleEncode] & [JwtSimpleDecode]
  /// </summary>
  static readonly byte[] seed = { 131, 117, 87, 14, 21, 150, 19, 75, 24, 10, 159, 78, 90, 51, 71, 159, 214, 186, 251, 20, 207, 246, 142, 127, 13, 29, 37, 43, 59, 30, 234, 13 };
  #endregion
}
